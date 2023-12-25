import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from "@nestjs/common";
import getRequest from "../common/utils/get-request.util";
import { USER_ID_KEY_IN_SESSION } from "../constants";

export const UserId = createParamDecorator<string>(
  (_, context: ExecutionContext) => {
    const request = getRequest(context);
    const userId = request.session[USER_ID_KEY_IN_SESSION];

    if (!userId || userId === "") {
      throw new InternalServerErrorException("Could not find user ID.");
    }

    return userId;
  },
);
