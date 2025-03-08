import { createMock } from "@golevelup/ts-jest";
import { ExecutionContext } from "@nestjs/common";
import { USER_ID_KEY_IN_SESSION } from "../../src";

export const mockContextWithRequest = (req: object): ExecutionContext => {
  const context = createMock<ExecutionContext>({
    getType: () => "http",
    switchToHttp: () => ({ getRequest: () => req }),
  });
  return context;
};

export const mockContextWithSession = (session: object): ExecutionContext =>
  mockContextWithRequest({ session });

export const mockContextWithUserId = (userId: string | undefined): ExecutionContext =>
  mockContextWithSession({
    [USER_ID_KEY_IN_SESSION]: userId,
  });
