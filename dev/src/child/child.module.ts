import { CloneBayModule } from "@joonashak/nestjs-clone-bay";
import { Module } from "@nestjs/common";
import { ChildController } from "./child.controller";

/**
 * For testing importing Clone Bay for children.
 */
@Module({
  imports: [CloneBayModule.forChildren()],
  controllers: [ChildController],
})
export class ChildModule {}
