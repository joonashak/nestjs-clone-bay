import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { MockingController } from "./mocking.controller";
import { MockingService } from "./mocking.service";

@Module({
  providers: [MockingService],
  controllers: [MockingController],
  exports: [MockingService],
})
export class MockingModule implements OnModuleInit {
  private readonly logger = new Logger(MockingModule.name);

  onModuleInit() {
    this.logger.warn("UNSAFE CONFIGURATION!");
    this.logger.warn(
      "The mocking module of nestjs-clone-bay has been mounted. This compromises the security of the consuming app.",
    );
  }
}
