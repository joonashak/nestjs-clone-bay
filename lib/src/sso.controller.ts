import {
  EveSsoCallbackParams,
  RequireSsoAuth,
  SsoService,
} from "@joonashak/nestjs-eve-auth";
import { Controller, Get, Query, Res, Session } from "@nestjs/common";
import { Response } from "express";

@Controller()
export class SsoController {
  constructor(private ssoService: SsoService) {}

  @Get()
  getHello(): string {
    return "hello";
  }

  @RequireSsoAuth()
  @Get("sso/login")
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async login() {}

  // @UsePipes(ValidationPipe)
  // @UseFilters(HttpExceptionFilter)
  @Get("sso/callback")
  async callback(
    @Query() callbackParams: EveSsoCallbackParams,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Session() session: Record<string, any>,
    @Res() response: Response,
  ) {
    await this.ssoService.callback(callbackParams, session);
    response.redirect("/");
  }
}
