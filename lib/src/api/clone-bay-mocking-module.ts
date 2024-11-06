import { Module } from "@nestjs/common";
import { MockingModule } from "../mocking/mocking.module";
import { CloneBayMockingService } from "./clone-bay-mocking.service";

@Module({
  imports: [MockingModule],
  providers: [CloneBayMockingService],
  exports: [CloneBayMockingService],
})
export class CloneBayMockingModule {}
