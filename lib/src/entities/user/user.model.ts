import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Character } from "../character/character.model";

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  main: Character;

  @Prop()
  alts?: Character[];
}

export type UserDocument = User & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(User);
