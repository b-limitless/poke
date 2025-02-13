import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FavoritePokemon } from './favorite-pokemon.schema';

@Injectable()
export class FavoritePokemonService {
  constructor(
    @InjectModel(FavoritePokemon.name)
    private readonly favoritePokemonModel: Model<FavoritePokemon>,
  ) {}

  async findByUserId(userId: string): Promise<FavoritePokemon[] | null> {
    return this.favoritePokemonModel.find({ userId }).exec();
  }

  async getMyFavoritePokemonIds(userId: string) {
    const favorites = await this.favoritePokemonModel.find({ userId }).select('pokemonId -_id').exec();
    return favorites.map((fav) => Number(fav.pokemonId));
  }
  
  async toggleFavorite(userId: string, pokemonId: string): Promise<FavoritePokemon | { message: string }> {
    const existingFavorite = await this.favoritePokemonModel.findOne({ userId, pokemonId }).exec();

    if (existingFavorite) {
      await this.favoritePokemonModel.deleteOne({ userId, pokemonId }).exec();
      return { message: 'Favorite removed successfully' };
    } else {
      const createdFavorite = new this.favoritePokemonModel({ userId, pokemonId });
      await createdFavorite.save();
      return createdFavorite;
    }
  }
}
