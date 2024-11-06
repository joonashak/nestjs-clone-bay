import { InternalServerErrorException } from "@nestjs/common";
import { USER_ID_KEY_IN_SESSION } from "../../constants";
import { getUserId, getUserIdSafe, setUserId } from "./session.util";

describe("Session utilities", () => {
  const userId = "jfa094j308";
  const session = { [USER_ID_KEY_IN_SESSION]: userId };

  describe("getUserIdSafe", () => {
    it("Returns user ID from session", () => {
      expect(getUserIdSafe(session)).toEqual(userId);
    });

    it("Throws for empty user ID", () => {
      const test = () => getUserIdSafe({ [USER_ID_KEY_IN_SESSION]: "" });
      expect(test).toThrow(InternalServerErrorException);
    });

    it("Throws for missing user ID", () => {
      const test = () => getUserIdSafe({});
      expect(test).toThrow(InternalServerErrorException);
    });

    it("Throws for missing session", () => {
      const test = () => getUserIdSafe(undefined);
      expect(test).toThrow(InternalServerErrorException);
    });
  });

  describe("getUserId", () => {
    it("Returns user ID from session", () => {
      expect(getUserId(session)).toEqual(userId);
    });

    it("Returns undefined for empty user ID", () => {
      expect(getUserId({ [USER_ID_KEY_IN_SESSION]: "" })).toBeUndefined();
    });

    it("Returns undefined for missing user ID", () => {
      expect(getUserId({})).toBeUndefined();
    });

    it("Returns undefined for missing session", () => {
      expect(getUserId(undefined)).toBeUndefined();
    });
  });

  describe("setUserId", () => {
    it("Adds user ID by mutating given object", () => {
      const mutableSession = {};
      setUserId(mutableSession, userId);
      expect(mutableSession[USER_ID_KEY_IN_SESSION]).toEqual(userId);
    });

    it("Writes over possibly existing user ID", () => {
      const mutableSession = { [USER_ID_KEY_IN_SESSION]: "smth else" };
      setUserId(mutableSession, userId);
      expect(mutableSession[USER_ID_KEY_IN_SESSION]).toEqual(userId);
    });

    it("Does not modify other session properties", () => {
      const mutableSession = { smth: 8 };
      setUserId(mutableSession, userId);
      expect(mutableSession.smth).toEqual(8);
    });
  });
});
