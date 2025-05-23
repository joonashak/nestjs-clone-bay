import { InternalServerErrorException } from "@nestjs/common";
import { get } from "lodash";
import { USER_ID_KEY_IN_SESSION } from "../../constants";

/**
 * Get user ID from Express session or throw if not found.
 */
export const getUserIdSafe = (session: unknown): string => {
  const userId = get(session, USER_ID_KEY_IN_SESSION);

  if (!userId || typeof userId !== "string") {
    throw new InternalServerErrorException();
  }

  return userId;
};

/**
 * Get user ID from Express session or return `undefined` if not found.
 */
export const getUserId = (session: unknown): string | undefined => {
  try {
    const userId = getUserIdSafe(session);
    return userId;
  } catch {
    return undefined;
  }
};

/**
 * Set user ID in Express session by mutating given session object.
 */
export const setUserId = (session: object, userId: string): void => {
  session[USER_ID_KEY_IN_SESSION] = userId;
};
