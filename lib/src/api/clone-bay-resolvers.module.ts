import { Module } from "@nestjs/common";
import { AuthorizationModule } from "../authorization/authorization.module";
import { UserResolver } from "../entities/user/user.resolver";

@Module({
  imports: [AuthorizationModule],
  providers: [UserResolver],
})
export class CloneBayResolversModule {}
