import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class ClassSection extends Document {
  @Prop({ required: true })
  className: string;

  @Prop({ required: true })
  sectionName: string;

  @Prop()
  description?: string;
}

export const ClassSectionSchema = SchemaFactory.createForClass(ClassSection);