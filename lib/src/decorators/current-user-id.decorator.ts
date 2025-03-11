import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import getRequest from "../common/utils/get-request.util";
import { getUserId, getUserIdSafe } from "../common/utils/session.util";

type CurrentUserIdDecoratorOptions = { nullable?: boolean };

// Exported for easier testing.
export const decoratorFunction = (
  options: CurrentUserIdDecoratorOptions = {},
  context: ExecutionContext,
): string | undefined => {
  const request = getRequest(context);

  if (options.nullable === true) {
    return getUserId(request.session);
  }

  try {
    return getUserIdSafe(request.session);
  } catch {
    // Throw 401 instead of 500.
    throw new UnauthorizedException();
  }
};

/**
 * Inject authenticated user's ID into method argument.
 *
 * This is Clone Bay's internal UUID, not EVE/ESI ID.
 *
 * Accepts an optional `options` configuration object to allow a missing user.
 * If `options.nullable` is set to `true`, this decorator will return `null` for
 * a missing user. Otherwise throws HTTP 401.
 *
 * ### Examples:
 *
 * ```ts
 * @Get("hello")
 * async hello(@CurrentUserId() userId: string) {
 *   // Will throw if user is not found.
 * }
 * ```
 *
 * ```ts
 * @Get("hello")
 * async hello(@CurrentUserId({ nullable: true }) userId: string | undefined) {
 *   // `userId` is `undefined` if not authenticated or not found.
 *   // No error is thrown.
 * }
 * ```
 *
 * @returns `string | null`
 * @group Decorators
 */
export const CurrentUserId = createParamDecorator<CurrentUserIdDecoratorOptions>(decoratorFunction);
