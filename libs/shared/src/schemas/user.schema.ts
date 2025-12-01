import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['student', 'teacher', 'admin'], default: 'student' })
  role: string;

  @Prop()
  resetToken?: string;

  @Prop()
  resetTokenExpiry?: Date;

  // Optional: student only
  @Prop({ type: Types.ObjectId, ref: 'Class' })
  classId?: Types.ObjectId;

  // Optional: teacher only
  @Prop({ type: [String] })
  teacherSubjects?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
