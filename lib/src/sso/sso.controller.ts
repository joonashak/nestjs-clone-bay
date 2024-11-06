import {
  EveSsoCallbackParams,
  RequireSsoAuth,
} from "@joonashak/nestjs-eve-auth";
import {
  Controller,
  Get,
  Query,
  Res,
  Session,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import { HttpExceptionFilter } from "../filters/http-exception.filter";
import { SsoService } from "./sso.service";

@Controller()
export class SsoController {
  constructor(private ssoService: SsoService) {}

  /**
   * Start SSO login process.
   *
   * This first saves the value of an optional `afterLoginUrl` query parameter
   * and then redirects to another GET endpoint that starts the actual login
   * process. The intermediate redirection is done in order to save the query
   * parameter value without having to use a middleware or a guard (the SSO
   * login is implemented as a guard which prevents accessing the query
   * parameters in a conventional manner).
   */
  @Get("sso/login")
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async login(
    @Query("afterLoginUrl") afterLoginUrl: string | undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Session() session: Record<string, any>,
    @Res() response: Response,
  ) {
    session.afterLoginUrl = afterLoginUrl;
    response.redirect("redirect");
  }

  @RequireSsoAuth()
  @Get("sso/redirect")
  async redirect() {}

  @UsePipes(ValidationPipe)
  @UseFilters(HttpExceptionFilter)
  @Get("sso/callback")
  async callback(
    @Query() callbackParams: EveSsoCallbackParams,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Session() session: Record<string, any>,
    @Res() response: Response,
  ) {
    const redirectUrl = await this.ssoService.login(callbackParams, session);
    response.redirect(redirectUrl);
  }
}
