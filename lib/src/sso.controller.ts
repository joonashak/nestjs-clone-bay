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
    const {
      character: { id: characterId },
      tokens,
    } = await this.ssoService.callback(callbackParams, session);

    const character = await this.characterService.addPublicInfoFromEsi({
      eveId: characterId,
      ...tokens,
    });

    const existingCharacter =
      await this.characterService.findOneByEveId(characterId);

    if (!existingCharacter) {
      await this.characterService.create(character);
    } else {
      this.characterService.update(character);
    }

    response.redirect("/");
  }
}
