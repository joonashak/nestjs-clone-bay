import { CloneBayMockingModule, CloneBayModule } from "@joonashak/nestjs-clone-bay";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SomeAbilityFactory } from "./some-ability.factory";
import { SomeController } from "./some.controller";
import { Some, SomeSchema } from "./some.model";
import { SomeResolver } from "./some.resolver";
import { SomeService } from "./some.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Some.name, schema: SomeSchema }]),
    CloneBayModule.forChildren(),
    CloneBayMockingModule,
  ],
  providers: [SomeService, SomeResolver, SomeAbilityFactory],
  controllers: [SomeController],
})
export class SomeModule {}
