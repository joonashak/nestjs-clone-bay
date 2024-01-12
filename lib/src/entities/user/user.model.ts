import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { Document, SchemaTimestampsConfig } from "mongoose";
import { Character } from "../character/character.model";

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field()
  @Prop({ default: randomUUID, unique: true, index: true })
  id: string;

  @Field(() => Character)
  @Prop({ type: Character, required: true, unique: true })
  main: Character;

  // DANGER: Not specifying the type explicitly here will result in alt characters' tokens being included by default!
  @Field(() => [Character])
  @Prop({ type: [Character] })
  alts: Character[];

  @Field()
  @Prop({ default: false })
  admin: boolean;
}

export type UserDocument = User & Document & SchemaTimestampsConfig;
export const UserSchema = SchemaFactory.createForClass(User);
