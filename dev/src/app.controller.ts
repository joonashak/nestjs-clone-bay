import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthenticationGuard } from "nestjs-clone-bay";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("auth")
  @UseGuards(AuthenticationGuard)
  async auth() {
    return "jee";
  }
}
