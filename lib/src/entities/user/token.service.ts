import { SsoService } from "@joonashak/nestjs-eve-auth";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as dayjs from "dayjs";
import { decode } from "jsonwebtoken";
import { Model } from "mongoose";
import { Character } from "../character/character.model";
import { UserCacheService } from "./user-cache.service";
import { User, UserDocument } from "./user.model";

@Injectable()
export class TokenService {
  private logger = new Logger(TokenService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userCacheService: UserCacheService,
    private ssoService: SsoService,
  ) {}

  async useToken(accessToken: string) {
    if (!this.tokenIsAlive(accessToken)) {
      const characterEveId = this.getCharacterEveId(accessToken);
      return this.refreshToken(characterEveId);
    }

    return accessToken;
  }

  async refreshToken(characterEveId: number) {
    const user = await this.findUserWithRefreshTokens(characterEveId);
    const character = this.getCharacter(user, characterEveId);
    const tokens = await this.ssoService.refreshTokens(character.refreshToken);
    character.accessToken = tokens.accessToken;
    // TODO: markModified does not work for alts here. Write a real query...
    await user.save();
  }

  private tokenIsAlive(accessToken: string): boolean {
    const decodedToken = decode(accessToken);
    const expiry = dayjs.unix(decodedToken["exp"]);
    return expiry.isAfter();
  }

  private getCharacterEveId(accessToken: string): number {
    const decodedToken = decode(accessToken);

    const characterEveId = Number(decodedToken.sub.toString().split(":")[2]);

    if (!characterEveId) {
      throw new InternalServerErrorException(
        "Could not find character EVE ID from access token.",
      );
    }

    return characterEveId;
  }

  private async findUserWithRefreshTokens(
    characterEveId: number,
  ): Promise<UserDocument> {
    return this.userModel
      .findOne({
        $or: [
          { "main.eveId": characterEveId },
          { "alts.eveId": characterEveId },
        ],
      })
      .populate("main.refreshToken")
      .populate("alts.refreshToken");
  }

  private getCharacter(user: UserDocument, characterEveId: number): Character {
    if (user.main.eveId === characterEveId) {
      return user.main;
    }

    const character = user.alts.find((alt) => alt.eveId === characterEveId);

    if (!character) {
      throw new InternalServerErrorException("Character not found.");
    }

    return character;
  }
}
