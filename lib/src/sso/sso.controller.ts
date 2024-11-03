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
import { ModuleConfigService } from "../config/module-config.service";
import { USER_ID_KEY_IN_SESSION } from "../constants";
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

    // TODO: session[USER_ID_KEY_IN_SESSION] should probably be something like getUserIdFromSession()...
    if (session[USER_ID_KEY_IN_SESSION]) {
      this.altService.addAlt(esiCharacter, session[USER_ID_KEY_IN_SESSION]);
    } else {
      const user = await this.authenticationService.ssoLogin(esiCharacter);
      // TODO: ...and setUserIdInSession() here.
      session[USER_ID_KEY_IN_SESSION] = user.id;
    }

    response.redirect(
      session.afterLoginUrl || this.moduleConfigService.config.afterLoginUrl,
    );
  }
}
