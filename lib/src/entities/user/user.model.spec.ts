import { get } from "lodash";
import { UserSchema } from "./user.model";

describe("UserModel", () => {
  it("Generated schema hides tokens", () => {
    const main = get(UserSchema.obj.main, "type");
    expect(get(main, "accessToken.select")).toBe(false);
    expect(get(main, "refreshToken.select")).toBe(false);

    const alts = get(UserSchema.obj.alts, "type", []);
    expect(get(alts[0], "accessToken.select")).toBe(false);
    expect(get(alts[0], "refreshToken.select")).toBe(false);
  });
});
