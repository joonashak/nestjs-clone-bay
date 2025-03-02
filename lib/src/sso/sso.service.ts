import { SsoService as EveAuthSsoService, EveSsoCallbackParams } from "@joonashak/nestjs-eve-auth";
import { Injectable } from "@nestjs/common";
import { get } from "lodash";
import { AuthenticationService } from "../authentication/authentication.service";
import { getUserId, setUserId } from "../common/utils/session.util";
import { ModuleConfigService } from "../config/module-config.service";
import { CharacterService } from "../entities/character/character.service";
import { AltService } from "../entities/user/alt.service";
import { User } from "../entities/user/user.model";

@Injectable()
export class SsoService {
  constructor(
    private eveAuthSsoService: EveAuthSsoService,
    private characterService: CharacterService,
    private authenticationService: AuthenticationService,
    private altService: AltService,
    private moduleConfigService: ModuleConfigService,
  ) {}

  async login(callbackParams: EveSsoCallbackParams, session: unknown): Promise<string> {
    const {
      character: { id: characterId },
      tokens,
    } = await this.eveAuthSsoService.callback(callbackParams, session);

    const esiCharacter = await this.characterService.addPublicInfoFromEsi({
      eveId: characterId,
      ...tokens,
    });

    const registerAlt = get(session, "registerAlt");
    const loggedInUserId = getUserId(session);

    let user: User;

    if (loggedInUserId && registerAlt) {
      user = await this.altService.addAlt(esiCharacter, loggedInUserId);
    } else {
      user = await this.authenticationService.ssoLogin(esiCharacter);
    }

    setUserId(session, user.id);

    return get(session, "afterLoginUrl") || this.moduleConfigService.config.afterLoginUrl;
  }
}
