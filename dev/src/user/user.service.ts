import { CloneBayUserService } from "@joonashak/nestjs-clone-bay";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);

  constructor(private cloneBayUserService: CloneBayUserService) {}

  async whoami(userId: string) {
    this.logger.debug(userId);
    const user = await this.cloneBayUserService.findById(userId);
    this.logger.debug(user);
    return user;
  }
}
