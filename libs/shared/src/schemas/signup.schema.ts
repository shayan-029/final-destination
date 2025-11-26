import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    enum: ['admin', 'teacher', 'student'],
    default: 'student',
  })
  role: 'admin' | 'teacher' | 'student';

  @Prop()
  phone?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
