import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ collection: "dynamic-config" })
export class DynamicConfig {
  @Prop()
  allowedCharacters: number[];

  @Prop()
  allowedCorporations: number[];

  @Prop()
  allowedAlliances: number[];
}

export type DynamicConfigDocument = DynamicConfig & mongoose.Document;
export const DynamicConfigSchema = SchemaFactory.createForClass(DynamicConfig);
