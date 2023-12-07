import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ collection: "dynamic-config" })
export class DynamicConfig {
  @Prop({ default: false })
  authDisabled: boolean;
}

export type DynamicConfigDocument = DynamicConfig & mongoose.Document;
export const DynamicConfigSchema = SchemaFactory.createForClass(DynamicConfig);
