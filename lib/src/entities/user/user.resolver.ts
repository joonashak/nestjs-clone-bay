import { ForbiddenException, Logger } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  Action,
  CaslAbilityFactory,
} from "../../authorization/casl-ability.factory";
import { RequireAuthentication } from "../../decorators/require-authentication.decorator";
import { UserId } from "../../decorators/user-id.decorator";
import { EveAccessToken } from "../../types/eve-access-token.dto";
import { TokenService } from "./token.service";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  private logger = new Logger(UserResolver.name);

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @RequireAuthentication()
  @Query(() => User)
  async whoami(@UserId() userId: string): Promise<User> {
    return this.userService.findById(userId);
  }

  // FIXME: Testing CASL.
  @RequireAuthentication()
  @Query(() => [User])
  async getAllUsers(@UserId() userId: string): Promise<User[]> {
    // TODO: Rewrite into a guard + decorator.
    const user = await this.userService.findById(userId);
    const ability = this.caslAbilityFactory.createForUser(user);
    console.log(ability.can(Action.Read, User));
    return this.userService.findAll();
  }

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
