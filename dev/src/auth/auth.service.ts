import { Injectable } from "@nestjs/common";
import { EveAuthConsumerService, EveAuthSsoLoginResult } from "nestjs-eve-auth";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService implements EveAuthConsumerService {
  constructor(private userService: UserService) {}

  async ssoLogin(loginResult: EveAuthSsoLoginResult): Promise<void> {
    const { character, tokens } = loginResult;
    await this.userService.create({
      name: character.name,
      esiId: character.id,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  }
}
