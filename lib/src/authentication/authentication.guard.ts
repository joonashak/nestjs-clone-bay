import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import getRequest from "../common/utils/get-request.util";
import { getUserId } from "../common/utils/session.util";
import { UserService } from "../entities/user/user.service";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = getRequest(context);
    const userId = getUserId(request.session);

    // Exit immediately if user ID is not defined for whatever reason.
    if (!userId) {
      return false;
    }

    const user = await this.userService.findById(userId);

    if (user === null) {
      return false;
    }

    return this.authenticationService.existingUserCanAuthenticate(user);
  }
}
