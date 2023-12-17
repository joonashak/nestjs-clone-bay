import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache, WrapTTL } from "cache-manager";

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  wrap<T>(key: string, fn: () => Promise<T>, ttl?: WrapTTL<T>): Promise<T> {
    return this.cacheManager.wrap(key, fn, ttl);
  }

  del(key: string): Promise<void> {
    return this.cacheManager.del(key);
  }
}
