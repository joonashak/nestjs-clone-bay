import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Character } from "../character/character.model";

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
    required: true,
    unique: true,
  })
  main: Character;

  // @Prop({
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: Character.name }],
  // })
  // alts?: Character[];
}

export type UserDocument = User & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(User);
