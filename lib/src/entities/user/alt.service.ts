import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserNotFoundException } from "../../exceptions/user-not-found.exception";
import { Character } from "../character/character.model";
import { UserCacheService } from "./user-cache.service";
import { User, UserDocument } from "./user.model";
import { UserService } from "./user.service";

@Injectable()
export class AltService {
  private logger = new Logger(AltService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService,
    private userCacheService: UserCacheService,
  ) {}

  async addAlt(alt: Character, userId: string): Promise<UserDocument> {
    // Must populate unselected fields to avoid removing them.
    const user = await this.userModel
      .findOne({ id: userId })
      .populate("alts.accessToken")
      .populate("alts.refreshToken");

    if (!user) {
      throw new UserNotFoundException();
    }

    await this.userCacheService.invalidateForUser(user);

    const existing = await this.userService.findByCharacterEveId(alt.eveId);
    if (existing) {
      this.logger.log(
        `Nothing was done because character given to add as an alt is already registered. (userId=${userId}, characterId=${alt.eveId})`,
      );
      return existing;
    }

    user.alts.push(alt);
    user.markModified("alts");
    return user.save();
  }

  async removeAlt(altEveId: number, userId: string): Promise<UserDocument> {
    const user = await this.userModel.findOneAndUpdate(
      { id: userId },
      { $pull: { alts: { eveId: altEveId } } },
      { returnDocument: "after" },
    );

    if (!user) {
      throw new UserNotFoundException();
    }

    await this.userCacheService.invalidateForUser(user);
    return user;
  }
}
