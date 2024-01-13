import {
  CloneBayUserService,
  RequireAuthentication,
  UserId,
} from "@joonashak/nestjs-clone-bay";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { SomeGuard } from "./some.guard";

@Controller()
export class SomeController {
  constructor(private cloneBayUserService: CloneBayUserService) {}

  @RequireAuthentication()
  @UseGuards(SomeGuard)
  @Get("whoami")
  async whoami(@UserId() userId: string) {
    return this.cloneBayUserService.findById(userId);
  }
}
