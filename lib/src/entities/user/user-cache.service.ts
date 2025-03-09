import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CacheService } from "../../cache/cache.service";
import { User, UserDocument } from "./user.model";

const keyForFindById = (id: string) => `cloneBay.userService.findById-${id}`;

const keyForFindByCharacterEveId = (id: number) =>
  `cloneBay.userService.findByCharacterEveId-${id}`;

const keyForFindWithAccessTokens = (id: string) =>
  `cloneBay.userService.findWithAccessTokens-${id}`;

@Injectable()
export class UserCacheService {
  private logger = new Logger(UserCacheService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private cacheService: CacheService,
  ) {}

  async findById(userId: string): Promise<User | null> {
    return this.cacheService.wrap(keyForFindById(userId), async () => {
      const doc = await this.userModel.findOne({ id: userId });
      return doc ? doc.toObject() : null;
    });
  }

  async findByCharacterEveId(characterEveId: number): Promise<UserDocument | null> {
    const key = keyForFindByCharacterEveId(characterEveId);

    return this.cacheService.wrap(key, () =>
      this.userModel.findOne({
        $or: [{ "main.eveId": characterEveId }, { "alts.eveId": characterEveId }],
      }),
    );
  }

  async findWithAccessTokens(userId: string): Promise<UserDocument | null> {
    const key = keyForFindWithAccessTokens(userId);

    return this.cacheService.wrap(key, () =>
      this.userModel
        .findOne({ id: userId })
        .populate("main.accessToken")
        .populate("alts.accessToken"),
    );
  }

  async invalidateForUser(user: UserDocument): Promise<void> {
    await this.cacheService.del(keyForFindById(user.id));
    await this.cacheService.del(keyForFindWithAccessTokens(user.id));

    // Must invalidate character-specific caches for main and all alts.
    const characterEveIds = user.alts.map((alt) => alt.eveId);
    characterEveIds.push(user.main.eveId);
    await Promise.all(
      characterEveIds.map((id) => this.cacheService.del(keyForFindByCharacterEveId(id))),
    );

    this.logger.verbose(`User caches invalidated. (userId=${user.id})`);
  }
}
