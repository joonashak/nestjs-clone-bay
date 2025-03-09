import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { RemoveMeController } from "./remove-me.controller";
import { RemoveMeService } from "./remove-me.service";

@Module({
  imports: [ConfigModule],
  providers: [RemoveMeService],
  controllers: [RemoveMeController],
  exports: [RemoveMeService],
})
export class RemoveMeModule {}
