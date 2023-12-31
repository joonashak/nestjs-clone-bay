import { ForbiddenException, Logger } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { RequireAuthentication } from "../../decorators/require-authentication.decorator";
import { UserId } from "../../decorators/user-id.decorator";
import { EveAccessToken } from "../../types/eve-access-token.dto";
import { TokenService } from "./token.service";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  private logger = new Logger(UserResolver.name);

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
  ) {}

  @RequireAuthentication()
  @Query(() => [EveAccessToken])
  async getMyTokens(@UserId() userId: string): Promise<EveAccessToken[]> {
    return this.tokenService.findAccessTokens(userId);
  }

  @RequireAuthentication()
  @Mutation(() => EveAccessToken)
  async refreshToken(
    @UserId() userId: string,
    @Args("characterEveId") characterEveId: number,
  ): Promise<EveAccessToken> {
    // FIXME: Improve authorization. First use case for CASL?
    const canActivate = await this.userService.userOwnsCharacter(
      userId,
      characterEveId,
    );

    if (!canActivate) {
      this.logger.warn(
        `User tried to refresh token for a character that is not registered under their account. (userId=${userId}, characterEveId=${characterEveId})`,
      );
      throw new ForbiddenException();
    }

    const accessToken = await this.tokenService.refreshToken(characterEveId);
    return { eveId: characterEveId, accessToken };
  }
}
