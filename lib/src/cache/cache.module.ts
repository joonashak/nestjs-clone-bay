import { CacheModule as NestCacheModule } from "@nestjs/cache-manager";
import { Global, Module } from "@nestjs/common";
import { CacheService } from "./cache.service";

@Global()
@Module({
  imports: [NestCacheModule.register({ ttl: 5000 })],
  providers: [CacheService],
  exports: [NestCacheModule, CacheService],
})
export class CacheModule {}
