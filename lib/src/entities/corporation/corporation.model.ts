import { Prop, Schema } from "@nestjs/mongoose";

/** Simple model containing immutable properties of corporations. */
@Schema()
export class Corporation {
  @Prop({ required: true })
  eveId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ticker: string;
}
