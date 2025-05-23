import { ForbiddenException, Logger } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserAbility } from "../../authorization/ability.factory";
import { UserAction } from "../../authorization/user-action.enum";
import { CurrentUserId } from "../../decorators/current-user-id.decorator";
import { RequireAuthentication } from "../../decorators/require-authentication.decorator";
import { RequirePolicies } from "../../decorators/require-policies.decorator";
import { UserNotFoundException } from "../../exceptions/user-not-found.exception";
import { EveAccessToken } from "../../types/eve-access-token.dto";
import { AltService } from "./alt.service";
import { TokenService } from "./token.service";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  private logger = new Logger(UserResolver.name);

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private altService: AltService,
  ) {}

  @RequireAuthentication()
  @Query(() => User)
  async whoami(@CurrentUserId() userId: string): Promise<User> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  // FIXME: Testing CASL.
  @RequireAuthentication()
  @RequirePolicies((ability: UserAbility) => ability.can(UserAction.Read, User))
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @RequireAuthentication()
  @Query(() => [EveAccessToken])
  async getMyTokens(@CurrentUserId() userId: string): Promise<EveAccessToken[]> {
    return this.tokenService.findAccessTokensByUserId(userId);
  }

  @RequireAuthentication()
  @Mutation(() => EveAccessToken)
  async refreshToken(
    @CurrentUserId() userId: string,
    @Args("characterEveId") characterEveId: number,
  ): Promise<EveAccessToken> {
    const canActivate = await this.userService.userOwnsCharacter(userId, characterEveId);

    if (!canActivate) {
      this.logger.warn(
        `User tried to refresh token for a character that is not registered under their account. (userId=${userId}, characterEveId=${characterEveId})`,
      );
      throw new ForbiddenException();
    }

    const accessToken = await this.tokenService.refreshToken(characterEveId);
    return { eveId: characterEveId, accessToken };
  }

  @RequireAuthentication()
  @Mutation(() => User)
  async removeAlt(@CurrentUserId() userId: string, @Args("eveId") altEveId: number): Promise<User> {
    return this.altService.removeAlt(altEveId, userId);
  }
}
