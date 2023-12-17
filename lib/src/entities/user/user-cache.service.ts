import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CacheService } from "../../cache/cache.service";
import { User, UserDocument } from "./user.model";

const keyForFindById = (id: string) => `cloneBay.userService.findById-${id}`;

const keyForFindByCharacterEveId = (id: number) =>
  `cloneBay.userService.findByCharacterEveId-${id}`;

@Injectable()
export class UserCacheService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private cacheService: CacheService,
  ) {}

  async findById(userId: string): Promise<UserDocument> {
    return this.cacheService.wrap(keyForFindById(userId), async () =>
      this.userModel.findOne({ id: userId }),
    );
  }

  async findByCharacterEveId(characterEveId: number): Promise<UserDocument> {
    const key = keyForFindByCharacterEveId(characterEveId);

    return this.cacheService.wrap(key, () =>
      this.userModel.findOne({
        $or: [
          { "main.eveId": characterEveId },
          { "alts.eveId": characterEveId },
        ],
      }),
    );
  }

  async invalidateForUser(user: UserDocument): Promise<void> {
    await this.cacheService.del(keyForFindById(user.id));

    // Must invalidate character-specific caches for main and all alts.
    const characterEveIds = user.alts.map((alt) => alt.eveId);
    characterEveIds.push(user.main.eveId);
    await Promise.all(
      characterEveIds.map((id) =>
        this.cacheService.del(keyForFindByCharacterEveId(id)),
      ),
    );
  }
}
