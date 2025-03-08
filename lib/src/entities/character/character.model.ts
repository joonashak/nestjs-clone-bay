import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { Alliance } from "../alliance/alliance.model";
import { Corporation } from "../corporation/corporation.model";

@ObjectType()
@Schema()
export class Character {
  @Field()
  @Prop({ required: true })
  eveId: number;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => Corporation)
  @Prop({ required: true })
  corporation: Corporation;

  @Field(() => Alliance, { nullable: true })
  @Prop({ type: Alliance, default: null })
  alliance?: Alliance | null;

  @Prop({ select: false, default: null })
  accessToken?: string;

  @Prop({ select: false, default: null })
  refreshToken?: string;
}
