import { RequireAuthentication, UserId } from "@joonashak/nestjs-clone-bay";
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { UserService } from "./user/user.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
  ) {}

  @Get()
  async getHello(@UserId() userId: string) {
    const user = await this.userService.whoami(userId);
    return user;
  }

  @RequireAuthentication()
  @Get("auth")
  async auth(@UserId() userId: string) {
    return "hello " + userId;
  }
}
