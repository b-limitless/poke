import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Adds createdAt & updatedAt automatically
export class Pokemon extends Document {
  @Prop({ required: true, unique: true })
  pokeId: number; // Pokémon ID

  @Prop({ required: true })
  name: string; // Pokémon Name

  @Prop({ required: true })
  image: string; // Default Image URL

  @Prop({ required: true })
  animatedImage: string; // GIF Image for Hover Effect

  @Prop({ type: [String], default: [] })
  types: string[]; // Fire, Water, etc.

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);