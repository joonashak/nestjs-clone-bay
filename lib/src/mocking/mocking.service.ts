import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { setUserId } from "../common/utils/session.util";
import { User } from "../entities/user/user.model";
import { UserService } from "../entities/user/user.service";

@Injectable()
export class MockingService {
  constructor(
    @InjectConnection() private dbConnection: Connection,

    private userService: UserService,
  ) {}

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

  /**
   * Removes all users and sessions.
   *
   * Note that dynamic config is left untouched.
   */
  async reset() {
    await this.dbConnection.dropCollection("users");
    await this.dbConnection.dropCollection("sessions");
  }
}
