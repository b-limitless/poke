import axios from 'axios';
import { fetchPokemonDetails } from './fetchPokemonDetails';

const POKE_API_BASE = 'https://pokeapi.co/api/v2/pokemon';

/**
 * Fetches a list of Pokémon (with details like ID, name, and image).
 * @param page - Page number (each page contains 150 Pokémon).
 * @param searchQuery - Optional: Fetch a specific Pokémon by name.
 */
export async function fetchPokemonList(page: number = 0, searchQuery?: string) {
  const limit = 5; //150;
  const offset = page * limit;

  try {
    if (searchQuery) {
      return [await fetchPokemonDetails(searchQuery)];
    }

    const { data } = await axios.get(`${POKE_API_BASE}?offset=${offset}&limit=${limit}`);

    // Fetch details in parallel for all Pokémon
    const pokemonList = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        return await fetchPokemonDetails(pokemon.name);
      })
    );

    return pokemonList;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error.message);
    return [];
  }
}