import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserModel } from "./user.model";

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(@InjectModel(UserService.name) private userModel: UserModel) {}

  async create(user: User) {
    return this.userModel.create(user);
  }
}
