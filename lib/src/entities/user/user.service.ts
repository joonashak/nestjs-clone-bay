import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { merge } from "lodash";
import { Model } from "mongoose";
import { Character } from "../character/character.model";
import { UserCacheService } from "./user-cache.service";
import { User, UserDocument } from "./user.model";

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userCacheService: UserCacheService,
  ) {}

  async create(user: Omit<User, "id">) {
    return this.userModel.create(user);
  }

  async findById(userId: string): Promise<UserDocument> {
    return this.userCacheService.findById(userId);
  }

  /** Search for one user with given character as main or in alts. */
  async findByCharacterEveId(characterEveId: number): Promise<UserDocument> {
    return this.userCacheService.findByCharacterEveId(characterEveId);
  }

  /**
   * Update `user` with `character`.
   *
   * The main and alt characters are searched for a match by EVE ID, and the
   * matching character replaced with the given character.
   */
  async updateCharacter(
    user: UserDocument,
    character: Character,
  ): Promise<UserDocument> {
    await this.userCacheService.invalidateForUser(user);

    if (user.main.eveId === character.eveId) {
      merge(user, { main: character });
      return user.save();
    }

    const { alts } = user;
    const altCharacter = alts.find((alt) => alt.eveId === character.eveId);

    if (altCharacter) {
      merge(altCharacter, character);
      user.markModified("alts");
    }

    return user.save();
  }

  async addAlt(alt: Character, userId: string): Promise<UserDocument> {
    const user = await this.findById(userId);
    await this.userCacheService.invalidateForUser(user);

    const existing = await this.findByCharacterEveId(alt.eveId);
    if (existing) {
      return existing;
    }

    user.alts.push(alt);
    user.markModified("alts");
    return user.save();
  }
}
