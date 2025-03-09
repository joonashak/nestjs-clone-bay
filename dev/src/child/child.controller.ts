import { CloneBayUserService, RequireAuthentication, UserId } from "@joonashak/nestjs-clone-bay";
import { Controller, Get, Logger } from "@nestjs/common";

@Controller()
export class ChildController {
  logger = new Logger(ChildController.name);

  constructor(private userService: CloneBayUserService) {}

  @Get("whoami")
  async whoami(@UserId() userId: string) {
    return this.userService.findById(userId);
  }

  @RequireAuthentication()
  @Get("private")
  async priv() {
    return "private endpoint";
  }
}
