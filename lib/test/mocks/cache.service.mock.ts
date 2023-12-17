import { CacheService } from "../../src/cache/cache.service";
import { provideMockService } from "./mock-services";

const provideMockCacheService = provideMockService(CacheService);

export const MockCacheService = provideMockCacheService({
  wrap: <T>(key: string, fn: () => Promise<T>) => fn(),
});
