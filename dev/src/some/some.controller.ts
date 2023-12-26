import { Controller, Get } from "@nestjs/common";
import {
  CloneBayUserService,
  RequireAuthentication,
  UserId,
} from "nestjs-clone-bay";

@Controller()
export class SomeController {
  constructor(private cloneBayUserService: CloneBayUserService) {}

  @RequireAuthentication()
  @Get("whoami")
  async whoami(@UserId() userId: string) {
    return this.cloneBayUserService.findById(userId);
  }
}
