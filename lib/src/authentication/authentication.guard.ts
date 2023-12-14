import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import getRequest from "../common/utils/get-request.util";
import { USER_ID_KEY_IN_SESSION } from "../constants";
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
    const user = await this.userService.findById(
      request.session[USER_ID_KEY_IN_SESSION],
    );

    if (user === null) {
      return false;
    }

    return this.authenticationService.existingUserCanAuthenticate(user);
  }
}
