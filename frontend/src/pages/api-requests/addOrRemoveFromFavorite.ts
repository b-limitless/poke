import { APIs } from "utils/apis";
import { request } from "utils/request";

export const addOrRemoveFromFavorite = async (id: number) => {
  try {
    // await request
    await request({
      url: `${APIs.pokemon.favorite}/${id}`,
      method: "post",
    });

    console.log("Added/Removed from/to favriote.");
  } catch (err) {
    console.error(`Could not update favriote`, err);
  }
};