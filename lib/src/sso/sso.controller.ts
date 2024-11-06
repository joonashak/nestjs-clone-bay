import {
  EveSsoCallbackParams,
  RequireSsoAuth,
  SsoService,
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
import { AuthenticationService } from "../authentication/authentication.service";
import { getUserId, setUserId } from "../common/utils/session.util";
import { ModuleConfigService } from "../config/module-config.service";
import { CharacterService } from "../entities/character/character.service";
import { AltService } from "../entities/user/alt.service";
import { HttpExceptionFilter } from "../filters/http-exception.filter";

@Controller()
export class SsoController {
  constructor(
    private ssoService: SsoService,
    private characterService: CharacterService,
    private authenticationService: AuthenticationService,
    private altService: AltService,
    private moduleConfigService: ModuleConfigService,
  ) {}

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
    const {
      character: { id: characterId },
      tokens,
    } = await this.ssoService.callback(callbackParams, session);

    const esiCharacter = await this.characterService.addPublicInfoFromEsi({
      eveId: characterId,
      ...tokens,
    });

    const loggedInUserId = getUserId(session);
    if (loggedInUserId) {
      this.altService.addAlt(esiCharacter, loggedInUserId);
    } else {
      const user = await this.authenticationService.ssoLogin(esiCharacter);
      setUserId(session, user.id);
    }

    response.redirect(
      session.afterLoginUrl || this.moduleConfigService.config.afterLoginUrl,
    );
  }
}
