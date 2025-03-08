import { SsoService } from "@joonashak/nestjs-eve-auth";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CharacterDoesNotBelongException } from "../../exceptions/character-does-not-belong.exception";
import { CharacterNotFoundException } from "../../exceptions/character-not-found.exception";
import { RefreshTokenNotFoundException } from "../../exceptions/refresh-token-not-found.exception";
import { UserNotFoundException } from "../../exceptions/user-not-found.exception";
import { EveAccessToken } from "../../types/eve-access-token.dto";
import { Character } from "../character/character.model";
import { UserCacheService } from "./user-cache.service";
import { User, UserDocument } from "./user.model";
import { UserService } from "./user.service";

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userCacheService: UserCacheService,
    private ssoService: SsoService,
    private userService: UserService,
  ) {}

  async findAccessTokensByUserId(userId: string): Promise<EveAccessToken[]> {
    const user = await this.userService.findWithAccessTokens(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    const characters = user.alts.concat(user.main);

    return characters.map(({ eveId, accessToken }) => ({
      eveId,
      accessToken,
    }));
  }

  async findAccessTokenByCharacterId(characterEveId: number): Promise<EveAccessToken | null> {
    const user = await this.userService.findByCharacterEveId(characterEveId);

    if (!user) {
      throw new UserNotFoundException();
    }

    const tokens = await this.findAccessTokensByUserId(user.id);
    const characterToken = tokens.find((t) => t.eveId === characterEveId);

    if (!characterToken || !characterToken.accessToken) {
      return null;
    }

    return characterToken;
  }

  /**
   * Get character's access token if given user owns it.
   *
   * A safe version of `TokenService.findAccessTokenByCharacterId`.
   */
  async findAccessTokenByCharacterIdSafe(
    characterEveId: number,
    userId: string,
  ): Promise<EveAccessToken | null> {
    const userOwnsCharacter = await this.userService.userOwnsCharacter(userId, characterEveId);

    if (!userOwnsCharacter) {
      throw new CharacterDoesNotBelongException();
    }

    return this.findAccessTokenByCharacterId(characterEveId);
  }

  /**
   * Refresh SSO tokens for character.
   *
   * New tokens are saved after refreshing and the new access token returned.
   *
   * _**DANGER**_:
   *
   * Note that this function operates solely on the character ID making it
   * crucial that the calling code ensures safety. Passing user-controlled ID as
   * the argument and returning the resulting new access code to them will allow
   * bad actors to impersonate users against ESI API. (Character EVE ID's are
   * public.)
   */
  async refreshToken(characterEveId: number): Promise<string> {
    const user = await this.findUserWithRefreshTokens(characterEveId);
    const character = this.getCharacter(user, characterEveId);

    if (!character.refreshToken) {
      throw new RefreshTokenNotFoundException();
    }

    const tokens = await this.ssoService.refreshTokens(character.refreshToken);

    character.accessToken = tokens.accessToken;
    character.refreshToken = tokens.refreshToken;
    user.markModified("alts");
    await user.save();
    await this.userCacheService.invalidateForUser(user);

    return tokens.accessToken;
  }

  /**
   * Revoke all refresh tokens for user.
   */
  async revokeTokens(inputUser: User): Promise<void> {
    const user = await this.findUserWithRefreshTokens(inputUser.main.eveId);
    const refreshTokens = user.alts.map((alt) => alt.refreshToken);
    refreshTokens.push(user.main.refreshToken);
    await Promise.all(
      refreshTokens.map(async (token) => {
        if (token) {
          await this.ssoService.revokeRefreshToken(token);
        }
      }),
    );
    await this.userCacheService.invalidateForUser(user);
  }

  private async findUserWithRefreshTokens(characterEveId: number): Promise<UserDocument> {
    const user = await this.userModel
      .findOne({
        $or: [{ "main.eveId": characterEveId }, { "alts.eveId": characterEveId }],
      })
      .populate("main.accessToken")
      .populate("main.refreshToken")
      .populate("alts.accessToken")
      .populate("alts.refreshToken");

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  private getCharacter(user: UserDocument, characterEveId: number): Character {
    if (user.main.eveId === characterEveId) {
      return user.main;
    }

    const character = user.alts.find((alt) => alt.eveId === characterEveId);

    if (!character) {
      throw new CharacterNotFoundException();
    }

    return character;
  }
}
