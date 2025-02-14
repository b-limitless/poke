import { APIs } from "utils/apis";
import { request } from "utils/request";

export const fetchFevoritesIds = async () => {
  try {
    return await request({
      url: APIs.pokemon.getFavoriteIds,
      method: "get",
    });
  } catch (err) {
    console.error(`Could not update favriote`, err);
  }
};

export const fetchFevorites = async () => {
  try {
    return await request({
      url: APIs.pokemon.favorite,
      method: "get",
    });
  } catch (err) {
    console.error(`Could not update favriote`, err);
  }
};

export const fetchPokemonsAPIs = async (page: number) => {
  try {
    const response = await request({
      url: APIs.pokemon.index(page),
      method: "get",
    });       
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
