import { Injectable } from "@nestjs/common";
import { User } from "../entities/user/user.model";
import { MockingService } from "../mocking/mocking.service";

/**
 * @group Testing
 */
@Injectable()
export class CloneBayMockingService {
  constructor(private mockingService: MockingService) {}

  async createUser(user: Omit<User, "id">) {
    return this.mockingService.createUser(user);
  }

  async loginWithEveId(session: unknown, eveId: number) {
    return this.mockingService.loginWithEveId(session, eveId);
  }
}
