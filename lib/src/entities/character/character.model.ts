import { Prop, Schema } from "@nestjs/mongoose";
import { Alliance } from "../alliance/alliance.model";
import { Corporation } from "../corporation/corporation.model";

@Schema()
export class Character {
  @Prop({ required: true })
  eveId: number;

  @Prop({ required: true })
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
