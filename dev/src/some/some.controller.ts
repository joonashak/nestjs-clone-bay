import {
  CloneBayUserService,
  RequireAuthentication,
  UserId,
} from "@joonashak/nestjs-clone-bay";
import { Controller, Get } from "@nestjs/common";

@Controller()
export class SomeController {
  constructor(private cloneBayUserService: CloneBayUserService) {}

  @RequireAuthentication()
  @Get("whoami")
  async whoami(@UserId() userId: string) {
    return this.cloneBayUserService.findById(userId);
  }
}
