import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Adds createdAt & updatedAt automatically
export class Pokemon extends Document {
  @Prop({ required: true, unique: true })
  pokemonId: number; // Pokémon ID

  @Prop({ required: true })
  name: string; // Pokémon Name

  @Prop({ required: true })
  url: string; // Default Image URL

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);