import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DynamicConfigInitService } from "./dynamic-config-init.service";
import { DynamicConfig, DynamicConfigSchema } from "./dynamic-config.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DynamicConfig.name, schema: DynamicConfigSchema },
    ]),
  ],
  providers: [DynamicConfigInitService],
  exports: [MongooseModule],
})
export class ConfigModule {}
