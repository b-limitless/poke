import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class PokemonDetails extends Document {
  @Prop({ required: true, unique: true })
  pokeId: number; // Pokémon ID (Foreign Key)

  @Prop({ type: [String], default: [] })
  abilities: string[]; // Pokémon Abilities

  @Prop({ type: [String], default: [] })
  types: string[]; // Pokémon Abilities

  @Prop({ type: [String], default: [] })
  evolutions: string[]; // Evolution Chain (Names or IDs)
}

export const PokemonDetailsSchema = SchemaFactory.createForClass(PokemonDetails);