import { createParamDecorator, UnauthorizedException } from "@nestjs/common";
import { get } from "lodash";
import getRequest from "../common/utils/get-request.util";

/**
 * Inject authenticated user into method argument.
 *
 * Accepts an optional `options` configuration object to allow a missing user.
 * If `options.nullable` is set to `true`, this decorator will return `null` for
 * a missing user. Otherwise throws HTTP 401.
 *
 * @returns `User | null`
 * @group Decorators
 */
export const CurrentUser = createParamDecorator<{ nullable?: boolean }>((options = {}, context) => {
  const request = getRequest(context);
  const user = get(request, "cloneBayUser");

  if (!options.nullable && !user) {
    throw new UnauthorizedException();
  }

  if (!user) {
    return null;
  }

  return user;
});
