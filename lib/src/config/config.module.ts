import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DynamicConfig, DynamicConfigSchema } from "./dynamic-config.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DynamicConfig.name, schema: DynamicConfigSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class ConfigModule {}
