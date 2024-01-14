import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type SomeDocument = Some & mongoose.Document;

@ObjectType()
@Schema()
export class Some {
  @Field(() => String)
  @Prop({ type: String })
  owner: string;
}

export const SomeSchema = SchemaFactory.createForClass(Some);
