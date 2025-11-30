import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ClassSection } from './class.schema';

@Schema({ timestamps: true })
export class Student extends Document {
  @Prop({ required: true })
  name: string;
  
  @Prop({ type: Types.ObjectId, ref: ClassSection.name, required: false })
  classId?: Types.ObjectId;

  @Prop({ required: true })
  course: string;
}


export const StudentSchema = SchemaFactory.createForClass(Student);
