import { APIs } from "utils/apis";
import { request } from "utils/request";

export const addOrRemoveFromFavorite = async (id: number) => {
  try {
    
    return await request({
      url: `${APIs.pokemon.favorite}/${id}`,
      method: "post",
    });
  } catch (err) {
    console.error(`Could not update favriote`, err);
  }
};
