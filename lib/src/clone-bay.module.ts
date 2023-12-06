import { SsoModule } from "@joonashak/nestjs-eve-auth";
import { Global, Module } from "@nestjs/common";
import { CloneBayModuleDefinition } from "./clone-bay.module-definition";
import { SsoController } from "./sso.controller";

/** @group Modules */
@Global()
@Module({
  imports: [SsoModule],
  controllers: [SsoController],
})
export class CloneBayModule extends CloneBayModuleDefinition {}
