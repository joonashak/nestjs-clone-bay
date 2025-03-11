import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import getRequest from "../common/utils/get-request.util";
import { getUserId, getUserIdSafe } from "../common/utils/session.util";

type UserIdDecoratorOptions = { nullable?: boolean };

// Exported for easier testing.
export const decoratorFunction = (
  options: UserIdDecoratorOptions = {},
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

export const UserId = createParamDecorator<UserIdDecoratorOptions>(decoratorFunction);
