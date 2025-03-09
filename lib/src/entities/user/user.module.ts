import { SsoModule } from "@joonashak/nestjs-eve-auth";
import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CloneBayUserService } from "../../api/clone-bay-user.service";
import { AuthenticationModule } from "../../authentication/authentication.module";
import { AuthorizationModule } from "../../authorization/authorization.module";
import { AltService } from "./alt.service";
import { TokenService } from "./token.service";
import { UserCacheService } from "./user-cache.service";
import { User, UserSchema } from "./user.model";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SsoModule,
    forwardRef(() => AuthenticationModule),
    AuthorizationModule,
  ],
  providers: [
    UserService,
    UserCacheService,
    TokenService,
    AltService,
    CloneBayUserService,
    UserResolver,
  ],
  exports: [MongooseModule, UserService, TokenService, AltService, CloneBayUserService],
})
export class UserModule {}
