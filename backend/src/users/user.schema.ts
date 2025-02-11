import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [Number], default: [], set: (v: number[]) => [...new Set(v)] }) 
  favoritePoke: number[];

}

export const UserSchema = SchemaFactory.createForClass(User);
