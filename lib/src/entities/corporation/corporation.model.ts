import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";

/**
 * Simple model containing immutable properties of corporations.
 */
@ObjectType()
@Schema()
export class Corporation {
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
