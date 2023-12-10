import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

/** Simple model containing immutable properties of alliances. */
@Schema()
export class Alliance {
  @Prop({ required: true })
  eveId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ticker: string;
}

export const AllianceSchema = SchemaFactory.createForClass(Alliance);
