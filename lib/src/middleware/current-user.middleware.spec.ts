import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { NextFunction, Request, Response } from "express";
import { mockUser } from "../../test/data";
import { provideMockService } from "../../test/mocks/mock-services";
import { UserService } from "../entities/user/user.service";
import { CurrentUserMiddleware } from "./current-user.middleware";

describe("CurrentUserMiddleware", () => {
  let currentUserMiddleware: CurrentUserMiddleware;
  let userService: UserService;
  let next: NextFunction;
  const res = createMock<Response>();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        provideMockService(UserService)({
          findById: jest.fn().mockResolvedValue(undefined),
        }),
        CurrentUserMiddleware,
      ],
    }).compile();

    currentUserMiddleware = module.get(CurrentUserMiddleware);
    userService = module.get(UserService);

    next = jest.fn();
  });

  it("Injects user object into request", async () => {
    const req = createMock<Request>({
      session: { userId: mockUser.id } as never,
    });
    jest.spyOn(userService, "findById").mockResolvedValueOnce(mockUser);

    await expect(currentUserMiddleware.use(req, res, next)).resolves.toBeUndefined();
    expect(req["cloneBayUser"]).toEqual(mockUser);
    expect(userService.findById).toHaveBeenCalledWith(mockUser.id);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("Does not call UserService when user ID is not found", async () => {
    const req = createMock<Request>({
      session: {} as never,
    });

    await expect(currentUserMiddleware.use(req, res, next)).resolves.toBeUndefined();
    expect(Object.keys(req)).not.toContain("cloneBayUser"); // Cannot use .toHaveProperty() with a mock object.
    expect(userService.findById).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("Injects nothing when user is not found", async () => {
    const req = createMock<Request>({
      session: { userId: mockUser.id } as never,
    });
    jest.spyOn(userService, "findById").mockResolvedValueOnce(null);

    await expect(currentUserMiddleware.use(req, res, next)).resolves.toBeUndefined();
    expect(Object.keys(req)).not.toContain("cloneBayUser"); // Cannot use .toHaveProperty() with a mock object.
    expect(next).toHaveBeenCalledTimes(1);
  });
});
