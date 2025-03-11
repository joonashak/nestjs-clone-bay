import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { get } from "lodash";
import getRequest from "../common/utils/get-request.util";
import { User } from "../entities/user/user.model";

type CurrentUserDecoratorOptions = { nullable?: boolean };

// Exported for easier testing.
export const decoratorFunction = (
  options: CurrentUserDecoratorOptions = {},
  context: ExecutionContext,
): User | null => {
  const request = getRequest(context);
  const user = get(request, "cloneBayUser");

  if (!options.nullable && !user) {
    throw new UnauthorizedException();
  }

  if (!user) {
    return null;
  }

  return user;
};

/**
 * Inject authenticated user into method argument.
 *
 * Accepts an optional `options` configuration object to allow a missing user.
 * If `options.nullable` is set to `true`, this decorator will return `null` for
 * a missing user. Otherwise throws HTTP 401.
 *
 * ### Examples:
 *
 * ```ts
 * @Get("hello")
 * async hello(@CurrentUser() user: User) {
 *   // Will throw if user is not found.
 * }
 * ```
 *
 * ```ts
 * @Get("hello")
 * async hello(@CurrentUser({ nullable: true }) user: User) {
 *   // `user` is `null` if not authenticated or not found. No error is thrown.
 * }
 * ```
 *
 * @returns `User | null`
 * @group Decorators
 */
export const CurrentUser = createParamDecorator<CurrentUserDecoratorOptions>(decoratorFunction);
