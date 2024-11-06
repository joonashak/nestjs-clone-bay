import { Body, Controller, Get, Post, Query, Session } from "@nestjs/common";
import { User } from "../entities/user/user.model";
import { MockingService } from "./mocking.service";

@Controller("clone-bay-mocking")
export class MockingController {
  constructor(private mockingService: MockingService) {}

  @Post("create-user")
  async createUser(@Body() user: Omit<User, "id">) {
    return this.mockingService.createUser(user);
  }

  @Get("login")
  async login(
    @Query("eveId") eveId: string,
    @Session() session: Record<string, unknown>,
  ) {
    return this.mockingService.loginWithEveId(session, Number(eveId));
  }
}
