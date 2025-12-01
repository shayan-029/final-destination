import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Class extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Teacher' })
  teacherId?: Types.ObjectId;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
