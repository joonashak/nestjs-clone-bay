import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Character } from "../character/character.model";

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Character.name,
    required: true,
    unique: true,
  })
  main: Character;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Character.name }],
  })
  alts: Character[];
}

export type UserDocument = User & mongoose.Document;
export type UserModel = Model<User>;
export const UserSchema = SchemaFactory.createForClass(User);
