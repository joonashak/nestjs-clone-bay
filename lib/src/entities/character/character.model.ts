import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Alliance } from "../alliance/alliance.model";
import { Corporation } from "../corporation/corporation.model";

@Schema({ timestamps: true })
export class Character {
  @Prop({ required: true, unique: true })
  eveId: number;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  corporation: Corporation;

  @Prop({ default: null })
  alliance?: Alliance;

  @Prop({ select: false, default: null })
  accessToken?: string;

  @Prop({ select: false, default: null })
  refreshToken?: string;
}

export type CharacterDocument = Character & mongoose.Document;
export const CharacterSchema = SchemaFactory.createForClass(Character);
