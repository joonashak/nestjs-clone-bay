import { UserSchema } from "./user.model";

describe("UserModel", () => {
  it("Generated schema hides tokens", () => {
    const main = UserSchema.obj.main["type"];
    expect(main.accessToken.select).toBe(false);
    expect(main.refreshToken.select).toBe(false);

    const alts = UserSchema.obj.alts["type"][0];
    expect(alts.accessToken.select).toBe(false);
    expect(alts.refreshToken.select).toBe(false);
  });
});
