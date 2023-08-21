import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Counter extends Document {
  @Prop({ type: String, required: true, unique: true })
  collectionName: string;

  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  nextId: number;
}
export type CounterDocument = Counter & Document;
export const CounterSchema = SchemaFactory.createForClass(Counter);
