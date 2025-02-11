import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './pokemon.schema';
import { Model } from 'mongoose';
import { PokemonDetails } from './pokemon-details.schema';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    //@InjectModel(PokemonDetails.name) private readonly pokemonDetailModel: Model<PokemonDetails>,
  ) {}

  // Find a user by email
  async findById(pokemonId: number): Promise<Pokemon | null> {
    return this.pokemonModel.findOne({ pokemonId }).exec();
  }

//   async findDetailById(pokemonId: number): Promise<Pokemon | null> {
//     return this.pokemonDetailModel.findOne({pokemonId})
//   }


}
