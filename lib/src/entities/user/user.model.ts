import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { Document, SchemaTimestampsConfig } from "mongoose";
import { Character } from "../character/character.model";

@Schema({ timestamps: true })
export class User {
  @Prop({ default: randomUUID, unique: true, index: true })
  id: string;

  @Prop({ type: Character, required: true, unique: true })
  main: Character;

  // DANGER: Not specifying the type explicitly here will result in alt characters' tokens being included by default!
  @Prop({ type: [Character] })
  alts: Character[];
}

export type UserDocument = User & Document & SchemaTimestampsConfig;
export const UserSchema = SchemaFactory.createForClass(User);
