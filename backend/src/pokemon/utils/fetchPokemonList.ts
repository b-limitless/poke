import { POKE_API_BASE } from "src/config";
import axios from "axios";
import { limit } from "../../config";
export async function fetchPokemonList(page: number = 0) {
    const offset = page * limit;
  
    try {
      const { data } = await axios.get(
        `${POKE_API_BASE}?offset=${offset}&limit=${limit}`,
      );
      const { results, count, next, previous } = data ?? {
        count: null,
        next: null,
        previous: null,
        results: [],
      };
      const pokemonsToInsert = data.results.map((pokemon: any) => {
        const pokemonId = parseInt(pokemon.url.split('/').slice(-2, -1)[0], 10);
        return {
          pokemonId,
          name: pokemon.name,
          url: pokemon.url,
        };
      });
  
      return {
        results: pokemonsToInsert,
        count,
        next,
        previous,
      };
    } catch (error) {
      throw new Error(`Error while fetching pokemon ${error.message}`);
    }
  }