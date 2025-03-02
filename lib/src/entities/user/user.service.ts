import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { merge } from "lodash";
import { Model } from "mongoose";
import { Character } from "../character/character.model";
import { UserCacheService } from "./user-cache.service";
import { User, UserDocument } from "./user.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userCacheService: UserCacheService,
  ) {}

  async create(user: Omit<User, "id">) {
    return this.userModel.create(user);
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find({});
  }

  async findById(userId: string): Promise<UserDocument> {
    return this.userCacheService.findById(userId);
  }

  /**
   * Search for one user with given character as main or in alts.
   */
  async findByCharacterEveId(characterEveId: number): Promise<UserDocument> {
    return this.userCacheService.findByCharacterEveId(characterEveId);
  }

  async findWithAccessTokens(userId: string): Promise<UserDocument> {
    return this.userCacheService.findWithAccessTokens(userId);
  }

  /**
   * Update `user` with `character`.
   *
   * The main and alt characters are searched for a match by EVE ID, and the
   * matching character replaced with the given character.
   */
  async updateCharacter(user: UserDocument, character: Character): Promise<UserDocument> {
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

  /**
   * Check if character is registered under user.
   */
  async userOwnsCharacter(userId: string, characterEveId: number): Promise<boolean> {
    const user = await this.userCacheService.findByCharacterEveId(characterEveId);

    if (user && user.id === userId) {
      return true;
    }

    return false;
  }

  async userCount(): Promise<number> {
    return this.userModel.collection.estimatedDocumentCount();
  }
}
