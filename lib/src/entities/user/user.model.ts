import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import mongoose from "mongoose";
import { Character } from "../character/character.model";

@Schema({ timestamps: true })
export class User {
  @Prop({ default: randomUUID, unique: true, index: true })
  id: string;

  @Prop({ required: true, unique: true })
  main: Character;

  @Prop()
  alts?: Character[];
}

export type UserDocument = User & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(User);
