import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from './pokemon.schema';

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

  async find(limit: number, skip: number) {
    return this.pokemonModel.find({}).skip(skip).limit(limit);
  }

  async insertManyPokemon(data: Pokemon[]) {
    return this.pokemonModel.insertMany(data);
  }

  
}
