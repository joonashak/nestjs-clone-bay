import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

/**
 * Simple model containing immutable properties of alliances.
 */
@ObjectType()
@Schema()
export class Alliance {
  @Field()
  @Prop({ required: true })
  eveId: number;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  ticker: string;
}

export const AllianceSchema = SchemaFactory.createForClass(Alliance);
