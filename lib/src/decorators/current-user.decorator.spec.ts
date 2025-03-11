import { UnauthorizedException } from "@nestjs/common";
import { mockUser } from "../../test/data";
import { mockContextWithRequest } from "../../test/mocks/mock-context";
import { decoratorFunction } from "./current-user.decorator";

describe("@CurrentUser decorator", () => {
  it("Returns user object from request", () => {
    const ctx = mockContextWithRequest({ cloneBayUser: mockUser });
    const test = () => decoratorFunction(undefined, ctx);
    expect(test()).toEqual(mockUser);
  });

  it("Throws for missing user object", () => {
    const ctx = mockContextWithRequest({});
    const test = () => decoratorFunction(undefined, ctx);
    expect(test).toThrow(UnauthorizedException);
  });

  it("Returns null for missing user if nullable flag is set", () => {
    const ctx = mockContextWithRequest({});
    const test = () => decoratorFunction({ nullable: true }, ctx);
    expect(test()).toBeNull();
  });
});
