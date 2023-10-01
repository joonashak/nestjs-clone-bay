import { SsoService } from "@joonashak/nestjs-eve-auth";
import { Module } from "@nestjs/common";
import { SsoController } from "./sso.controller";

@Module({
  providers: [SsoService],
  controllers: [SsoController],
})
export class CloneBayModule {}
