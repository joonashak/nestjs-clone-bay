import { Injectable } from "@nestjs/common";
import { TokenService } from "../entities/user/token.service";
import { User } from "../entities/user/user.model";
import { UserService } from "../entities/user/user.service";

@Injectable()
export class CloneBayUserService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async findById(userId: string): Promise<User> {
    const user = await this.userService.findById(userId);
    return user.toObject();
  }

  async revokeTokens(userId: string): Promise<void> {
    const user = await this.userService.findById(userId);
    await this.tokenService.revokeTokens(user);
  }
}
