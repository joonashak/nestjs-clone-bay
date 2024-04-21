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
    const res = await this.esiApiService.post({
      characterEveId: user.main.eveId,
      userId: user.id,
      url: `https://esi.evetech.net/v1/universe/ids/`,
      data: ["the scope"],
    });

    console.log(res.data);
    return res.data;
  }
}
