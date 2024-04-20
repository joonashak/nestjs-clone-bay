import {
  CloneBayEsiApiService,
  CloneBayUserService,
  RequireAuthentication,
  UserId,
} from "@joonashak/nestjs-clone-bay";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { SomeGuard } from "./some.guard";

@Controller()
export class SomeController {
  constructor(
    private cloneBayUserService: CloneBayUserService,
    private esiApiService: CloneBayEsiApiService,
  ) {}

  @RequireAuthentication()
  @UseGuards(SomeGuard)
  @Get("whoami")
  async whoami(@UserId() userId: string) {
    return this.cloneBayUserService.findById(userId);
  }

  @RequireAuthentication()
  @Get("esi")
  async esi(@UserId() userId: string) {
    const user = await this.cloneBayUserService.findById(userId);
    const res = await this.esiApiService.get({
      characterEveId: user.main.eveId,
      userId: user.id,
      url: `https://esi.evetech.net/v2/characters/${user.main.eveId}/titles/`,
    });

    return res.data;
  }
}
