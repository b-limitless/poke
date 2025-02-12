import axios from 'axios';

const POKE_API_BASE = 'https://pokeapi.co/api/v2/pokemon';
/**
 * Fetches details of a Pokémon by name or ID.
 * @param identifier - Pokémon ID or name.
 */
export async function fetchPokemonDetails(identifier: string | number) {
    try {
      const { data } = await axios.get(`${POKE_API_BASE}/${identifier}`);
  
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
        animatedImage: data.sprites.other?.showdown?.front_default || null,
        types: data.types.map((t: any) => t.type.name),
      };
    } catch (error) {
      console.error(`Error fetching Pokémon details for ${identifier}:`, error.message);
      return null;
    }
  }