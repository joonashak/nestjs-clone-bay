import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type CharacterDocument = Character & mongoose.Document;

@Schema()
export class Character {
  @Prop()
  eveId: number;

  @Prop()
  name: string;

  @Prop()
  accessToken: string;

  @Prop()
  refreshToken: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
