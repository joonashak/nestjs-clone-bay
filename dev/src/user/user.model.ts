import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop()
  esiId: number;

  @Prop()
  name: string;
  @Prop()
  accessToken: string;

  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
