import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { RemoveMeService } from "./remove-me.service";

@Module({
  imports: [ConfigModule],
  providers: [RemoveMeService],
  // controllers: [RemoveMeController],
  exports: [RemoveMeService],
})
export class RemoveMeModule {}
