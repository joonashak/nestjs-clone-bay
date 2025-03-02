import { Module } from "@nestjs/common";
import { MockingModule } from "../mocking/mocking.module";
import { CloneBayMockingService } from "./clone-bay-mocking.service";

/**
 * Mocking utilities for testing and development.
 *
 * _**CAUTION!** Importing this module into your application will make it
 * completely vulnerable. Use only in controlled environments such as testing
 * and development envs._
 *
 * This module provides {@link CloneBayMockingService} and also mounts a
 * controller that exposes the endpoints `/clone-bay-mocking/create-user` and
 * `/clone-bay-mocking/login`.
 *
 * @group Testing
 */
@Module({
  imports: [MockingModule],
  providers: [CloneBayMockingService],
  exports: [CloneBayMockingService],
})
export class CloneBayMockingModule {
  /**
   * @ignore
   */
  constructor() {}
}
