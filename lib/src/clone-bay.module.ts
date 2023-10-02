import { SsoModule } from "@joonashak/nestjs-eve-auth";
import { Module } from "@nestjs/common";
import { SsoController } from "./sso.controller";

@Module({
  imports: [SsoModule],
  controllers: [SsoController],
})
export class CloneBayModule {}
