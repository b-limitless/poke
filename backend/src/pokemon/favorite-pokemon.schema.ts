import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class FavoritePokemon extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId; // Reference to the user who favorited the Pokémon

  @Prop({ type: Types.ObjectId, ref: 'Pokemon', required: true })
  pokemonId: Types.ObjectId; // Reference to the Pokémon that is favorited
}

export const FavoritePokemonSchema = SchemaFactory.createForClass(FavoritePokemon);