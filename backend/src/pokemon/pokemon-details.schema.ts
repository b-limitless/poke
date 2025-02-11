import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class PokemonDetails extends Document {
  @Prop({ required: true, unique: true })
  pokeId: number; // Pokémon ID (Foreign Key)

  @Prop({ required: true })
  name: string; // Pokémon Name

  @Prop({ type: [String], default: [] })
  abilities: string[]; // Pokémon Abilities

  @Prop({ type: [String], default: [] })
  moves: string[]; // List of Moves

  @Prop({ type: [String], default: [] })
  evolutions: string[]; // Evolution Chain (Names or IDs)

  @Prop({ required: true })
  height: number; // Height in meters

  @Prop({ required: true })
  weight: number; // Weight in kg

  @Prop({ type: [String], default: [] })
  stats: string[]; // HP, Attack, Defense, etc.
}

export const PokemonDetailsSchema = SchemaFactory.createForClass(PokemonDetails);