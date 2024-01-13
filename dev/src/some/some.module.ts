import { CloneBayUserService } from "@joonashak/nestjs-clone-bay";
import { Module } from "@nestjs/common";
import { SomeController } from "./some.controller";
import { SomeResolver } from "./some.resolver";
import { SomeService } from "./some.service";

@Module({
  providers: [SomeService, CloneBayUserService, SomeResolver],
  controllers: [SomeController],
})
export class SomeModule {}
