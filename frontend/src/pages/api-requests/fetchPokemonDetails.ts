import { APIs } from "utils/apis";
import { request } from "utils/request";

export const fetchPokemonDetails = async (id: number) => {
  try {
    return await request({
      url: APIs.pokemon.details(id),
      method: "get",
    });
  } catch (err) {
    console.error(`Could not fetch pokemon details`);
  }
};
