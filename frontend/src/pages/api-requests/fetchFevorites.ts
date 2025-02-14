import { APIs } from "utils/apis";
import { request } from "utils/request";

export const fetchFevoritesIds = async () => {
  try {
    const response = await request({
      url: APIs.pokemon.getFavoriteIds,
      method: "get",
    });
    return response;
  } catch (err) {
    console.error(`Could not update favriote`, err);
  }
};
