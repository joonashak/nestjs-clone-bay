import { RequireAuthentication, UserId } from "@joonashak/nestjs-clone-bay";
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @RequireAuthentication()
  @Get("auth")
  async auth(@UserId() userId: string) {
    return "hello " + userId;
  }
}
