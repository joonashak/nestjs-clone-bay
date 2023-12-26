import { Module } from "@nestjs/common";
import { CloneBayUserService } from "nestjs-clone-bay";
import { SomeController } from "./some.controller";
import { SomeService } from "./some.service";

@Module({
  providers: [SomeService, CloneBayUserService],
  controllers: [SomeController],
})
export class SomeModule {}
