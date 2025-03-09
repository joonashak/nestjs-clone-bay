import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async wrap<T>(key: string, fn: () => Promise<T>, ttl?: number): Promise<T> {
    return this.cacheManager.wrap(key, fn, ttl);
  }

  async del(key: string): Promise<boolean> {
    return this.cacheManager.del(key);
  }

  getCacheManager() {
    return this.cacheManager;
  }
}
