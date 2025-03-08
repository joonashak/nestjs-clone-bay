import { Injectable } from "@nestjs/common";
import { TokenService } from "../entities/user/token.service";
import { User } from "../entities/user/user.model";
import { UserService } from "../entities/user/user.service";
import { UserNotFoundException } from "../exceptions/user-not-found.exception";

@Injectable()
export class CloneBayUserService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async findById(userId: string): Promise<User | null> {
    const user = await this.userService.findById(userId);
    return user?.toObject();
  }

  /**
   * Revoke all SSO tokens for user.
   *
   * Throws if the user is not found.
   */
  async revokeTokens(userId: string): Promise<void> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }
    await this.tokenService.revokeTokens(user);
  }
}
