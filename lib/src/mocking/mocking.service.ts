import { BadRequestException, Injectable } from "@nestjs/common";
import { setUserId } from "../common/utils/session.util";
import { User } from "../entities/user/user.model";
import { UserService } from "../entities/user/user.service";

@Injectable()
export class MockingService {
  constructor(private userService: UserService) {}

  async createUser(user: Omit<User, "id">) {
    return this.userService.create(user);
  }

  async loginWithEveId(session: unknown, eveId: number) {
    const user = await this.userService.findByCharacterEveId(eveId);

    if (!user) {
      throw new BadRequestException("User not found.");
    }

    setUserId(session, user.id);
    return user;
  }
}
