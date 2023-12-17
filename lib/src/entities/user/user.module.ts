import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserCacheService } from "./user-cache.service";
import { User, UserSchema } from "./user.model";
import { UserService } from "./user.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserCacheService],
  exports: [MongooseModule, UserService],
})
export class UserModule {}
