import { Controller, Get } from "@nestjs/common";
import { RequireAuthentication } from "nestjs-clone-bay";
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
  async auth() {
    return "jee";
  }
}
