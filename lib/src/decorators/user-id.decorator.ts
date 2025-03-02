import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import getRequest from "../common/utils/get-request.util";
import { getUserIdSafe } from "../common/utils/session.util";

export const UserId = createParamDecorator<string>((_, context: ExecutionContext) => {
  const request = getRequest(context);
  return getUserIdSafe(request.session);
});
