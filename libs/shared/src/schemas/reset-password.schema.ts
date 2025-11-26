import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PasswordResetDocument = PasswordReset & Document;

@Schema({ timestamps: true, collection: 'passwordresets' })
export class PasswordReset {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, index: true })
  otp: string;        // 4-6 digit OTP OR token

  @Prop({ required: true })
  expiresAt: Date;    // OTP expiry time
}

export const PasswordResetSchema = SchemaFactory.createForClass(PasswordReset);
