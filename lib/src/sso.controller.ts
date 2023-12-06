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
import { CharacterService } from "./entities/character/character.service";
import { HttpExceptionFilter } from "./filters/http-exception.filter";

@Controller()
export class SsoController {
  constructor(
    private ssoService: SsoService,
    private characterService: CharacterService,
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
    const result = await this.ssoService.callback(callbackParams, session);

    const existingCharacter = await this.characterService.findOneByEveId(
      result.character.id,
    );

    if (!existingCharacter) {
      await this.characterService.create({
        eveId: result.character.id,
        name: result.character.name,
        accessToken: result.tokens.accessToken,
        refreshToken: result.tokens.refreshToken,
      });
    }

    response.redirect("/");
  }
}
