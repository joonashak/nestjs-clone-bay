import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { get, set } from "lodash";
import { UserService } from "../entities/user/user.service";

/**
 * Inject user object into request if user is authenticated.
 *
 * No verification or validation is done. If `userId` is not found in the
 * session object or a user is not found with that ID, nothing is inserted and
 * the request execution resumed (necessary because this middleware is called on
 * every request).
 *
 * @internal
 */
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(request: Request, _: Response, next: NextFunction) {
    const userId = get(request, "session.userId");

    if (userId) {
      const user = await this.userService.findById(userId);
      if (user) {
        set(request, "cloneBayUser", user);
      }
    }

    next();
  }
}
