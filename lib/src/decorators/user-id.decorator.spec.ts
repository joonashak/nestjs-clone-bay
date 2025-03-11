import { mockUser } from "../../test/data";
import { mockContextWithSession } from "../../test/mocks/mock-context";
import { decoratorFunction } from "./user-id.decorator";

describe("@UserId decorator", () => {
  const userId = mockUser.id;

  it("Returns user ID from session", () => {
    const ctx = mockContextWithSession({ userId });
    const test = () => decoratorFunction(undefined, ctx);
    expect(test()).toBe(userId);
  });

  it("Throws for missing user ID", () => {
    const ctx = mockContextWithSession({});
    const test = () => decoratorFunction(undefined, ctx);
    expect(test).toThrow();
  });

  it("Returns undefined for missing user ID if nullable flag is set", () => {
    const ctx = mockContextWithSession({});
    const test = () => decoratorFunction({ nullable: true }, ctx);
    expect(test()).toBeUndefined();
  });
});
