import { CloneBayUserService, RemoveMeService, UserId } from "@joonashak/nestjs-clone-bay";
import { Controller, Get, Logger } from "@nestjs/common";

@Controller()
export class ChildController {
  logger = new Logger(ChildController.name);

  constructor(
    private removeMeService: RemoveMeService,
    private userService: CloneBayUserService,
  ) {}

  @Get("child")
  async child() {
    const d = await this.removeMeService.doSomethingWithDynamicConfig();
    this.logger.debug(d);
    return this.removeMeService.doSomethingBasedOnConfig();
  }

  @Get("whoami")
  async whoami(@UserId() userId: string) {
    return this.userService.findById(userId);
  }
}
