import { Query, Resolver } from "@nestjs/graphql";
import { RequireAuthentication } from "../../decorators/require-authentication.decorator";
import { UserId } from "../../decorators/user-id.decorator";
import { EveAccessToken } from "../../types/eve-access-token.dto";
import { TokenService } from "./token.service";

@Resolver()
export class UserResolver {
  constructor(private tokenService: TokenService) {}

  @RequireAuthentication()
  @Query(() => [EveAccessToken])
  async getMyTokens(@UserId() userId: string) {
    return this.tokenService.findAccessTokens(userId);
  }
}
