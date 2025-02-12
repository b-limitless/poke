import axios from "axios";
import { POKE_API_BASE } from "src/config";

export async function searchPokemonByName(name: string) {
    try {
      const { data } = await axios.get(`${POKE_API_BASE}/${name.toLowerCase()}`);
  
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
      };
    } catch (error) {
      console.error(`Error while searching Pokémon: ${error.message}`);
      return null; // Return null if not found
    }
  }