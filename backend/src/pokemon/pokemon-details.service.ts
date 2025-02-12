import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PokemonDetails } from './pokemon-details.schema';

@Injectable()
export class PokemonDetailsService {
  constructor(
    @InjectModel(PokemonDetails.name) private readonly pokemonDetailsModel: Model<PokemonDetails>,
  ) {}

  async findById(pokeId: number): Promise<PokemonDetails | null> {
    return this.pokemonDetailsModel.findOne({ pokeId }).exec(); // Make sure to use pokeId, not pokemonId
  }
  async create(data: { pokeId: number; abilities: string[]; types: string[]; evolutions: string[] }): Promise<PokemonDetails> {
    const details = new this.pokemonDetailsModel(data);
    return details.save(); // Saves the pokemonDetails to the database
  }

}
