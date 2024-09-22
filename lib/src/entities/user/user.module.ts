import { SsoModule } from "@joonashak/nestjs-eve-auth";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AltService } from "./alt.service";
import { TokenService } from "./token.service";
import { UserCacheService } from "./user-cache.service";
import { User, UserSchema } from "./user.model";
import { UserService } from "./user.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SsoModule,
  ],
  providers: [UserService, UserCacheService, TokenService, AltService],
  exports: [MongooseModule, UserService, TokenService, AltService],
})
export class UserModule {}
