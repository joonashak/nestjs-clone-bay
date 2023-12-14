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
import { AuthenticationService } from "./authentication/authentication.service";
import { CharacterService } from "./entities/character/character.service";
import { HttpExceptionFilter } from "./filters/http-exception.filter";

@Controller()
export class SsoController {
  constructor(
    private ssoService: SsoService,
    private characterService: CharacterService,
    private authenticationService: AuthenticationService,
  ) {}

  @RequireSsoAuth()
  @Get("sso/login")
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async login() {}

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

    await this.authenticationService.ssoLogin(esiCharacter);

    response.redirect("/");
  }
}
