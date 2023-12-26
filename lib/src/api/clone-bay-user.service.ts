import { Injectable } from "@nestjs/common";
import { User } from "../entities/user/user.model";
import { UserService } from "../entities/user/user.service";

@Injectable()
export class CloneBayUserService {
  constructor(private userService: UserService) {}

  async findById(userId: string): Promise<User> {
    const user = await this.userService.findById(userId);
    return user.toObject();
  }
}
