import { Injectable } from "@nestjs/common";
import { User } from "../entities/user/user.model";
import { UserService } from "../entities/user/user.service";

@Injectable()
export class MockingService {
  constructor(private userService: UserService) {}

  async createUser(user: Omit<User, "id">) {
    return this.userService.create(user);
  }
}
