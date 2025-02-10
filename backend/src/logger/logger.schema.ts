import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Log extends Document {
  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop({ type: Object, required: false })
  metadata: Record<string, any>;
}

export const LogSchema = SchemaFactory.createForClass(Log);
