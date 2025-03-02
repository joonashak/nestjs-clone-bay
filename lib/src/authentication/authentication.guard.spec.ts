import { Test } from "@nestjs/testing";
import { mockContextWithSession, mockContextWithUserId } from "../../test/mocks/mock-context";
import { provideMockService } from "../../test/mocks/mock-services";
import { UserService } from "../entities/user/user.service";
import { AuthenticationGuard } from "./authentication.guard";
import { AuthenticationService } from "./authentication.service";

describe("TokenAuthGuard", () => {
  let guard: AuthenticationGuard;
  let userService: UserService;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        provideMockService(UserService)({
          findById: jest.fn().mockResolvedValue({}),
        }),
        provideMockService(AuthenticationService)({
          existingUserCanAuthenticate: jest.fn().mockResolvedValue(true),
        }),
        AuthenticationGuard,
      ],
    }).compile();

    guard = module.get(AuthenticationGuard);
    userService = module.get(UserService);
    authenticationService = module.get(AuthenticationService);
  });

  it("Allows access after finding user and passing authentication check", async () => {
    const ctx = mockContextWithUserId("asd");
    const test = async () => guard.canActivate(ctx);
    await expect(test()).resolves.toBe(true);
    expect(userService.findById).toBeCalledWith("asd");
    expect(userService.findById).toBeCalledTimes(1);
    expect(authenticationService.existingUserCanAuthenticate).toBeCalledWith({});
    expect(authenticationService.existingUserCanAuthenticate).toBeCalledTimes(1);
  });

  it("Denies access when user is not found", async () => {
    const ctx = mockContextWithUserId("asd");
    jest.spyOn(userService, "findById").mockResolvedValueOnce(null);
    const test = async () => guard.canActivate(ctx);
    await expect(test()).resolves.toBe(false);
    expect(userService.findById).toBeCalledWith("asd");
    expect(userService.findById).toBeCalledTimes(1);
    expect(authenticationService.existingUserCanAuthenticate).toBeCalledTimes(0);
  });

  it("Denies access when user ID is not included in session", async () => {
    const ctx = mockContextWithSession({});
    jest.spyOn(userService, "findById").mockResolvedValueOnce(null);
    const test = async () => guard.canActivate(ctx);
    await expect(test()).resolves.toBe(false);
    expect(userService.findById).toBeCalledTimes(0);
    expect(authenticationService.existingUserCanAuthenticate).toBeCalledTimes(0);
  });

  it("Denies access when user ID is undefined", async () => {
    const ctx = mockContextWithUserId(undefined);
    jest.spyOn(userService, "findById").mockResolvedValueOnce(null);
    const test = async () => guard.canActivate(ctx);
    await expect(test()).resolves.toBe(false);
    expect(userService.findById).toBeCalledTimes(0);
    expect(authenticationService.existingUserCanAuthenticate).toBeCalledTimes(0);
  });

  it("Denies access when user is not allowed to authenticate", async () => {
    const ctx = mockContextWithSession({});
    jest.spyOn(authenticationService, "existingUserCanAuthenticate").mockResolvedValueOnce(false);
    const test = async () => guard.canActivate(ctx);
    await expect(test()).resolves.toBe(false);
  });
});
