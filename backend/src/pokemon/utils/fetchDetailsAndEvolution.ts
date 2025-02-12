import axios from 'axios';
import { EVOLUTION_API_BASE, POKE_API_BASE } from 'src/config';

export async function fetchDetailsAndEvolution(pokeId: number) {
  try {
    const pokemonDetailsResponse = await axios.get(`${POKE_API_BASE}${pokeId}`);
    const { abilities, types } = pokemonDetailsResponse.data;

    const abilityNames = abilities.map((ability: any) => ability.ability.name);
    const typeNames = types.map((type: any) => type.type.name);

    const speciesResponse = await axios.get(`${EVOLUTION_API_BASE}/${pokeId}`);

    const evolutionChain = extractEvolutions(speciesResponse.data.chain);

    return {
      pokeId,
      abilities: abilityNames,
      types: typeNames,
      evolutions: evolutionChain,
    };
  } catch (error) {
    throw new Error(
      `Error while fetching Pokémon details or evolution: ${error.message}`,
    );
  }
}

function extractEvolutions(chain: any) {
  const evolutions = [];
  let current = chain;

  while (current) {
    const speciesName = current.species.name;
    evolutions.push(speciesName);

    current = current.evolves_to[0];
  }

  return evolutions;
}
