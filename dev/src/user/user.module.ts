import { CloneBayUserService } from "@joonashak/nestjs-clone-bay";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";

@Module({
  // imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  // providers: [UserService],
  // exports: [MongooseModule, UserService],
  imports: [],
  providers: [UserService, CloneBayUserService],
  exports: [UserService],
})
export class UserModule {}
