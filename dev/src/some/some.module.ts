import { CloneBayUserService } from "@joonashak/nestjs-clone-bay";
import { Module } from "@nestjs/common";
import { SomeController } from "./some.controller";
import { SomeService } from "./some.service";

@Module({
  providers: [SomeService, CloneBayUserService],
  controllers: [SomeController],
})
export class SomeModule {}
