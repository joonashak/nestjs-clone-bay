import { Module } from "@nestjs/common";
import { UserResolver } from "../entities/user/user.resolver";

@Module({
  providers: [UserResolver],
})
export class CloneBayResolversModule {}
