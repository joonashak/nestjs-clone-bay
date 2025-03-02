import { AxiosRequestConfig } from "axios";

/**
 * @group Types
 */
export interface EsiApiRequestOptions {
  /**
   * EVE ID of the character whose ESI access token should be used to
   * authenticate the request.
   */
  characterEveId: number;
  /**
   * Request URL.
   *
   * Given value must start with `"https://esi.evetech.net/"` to guard against
   * accidental token leaks. This behavior can be disabled with
   * `allowUnsafeUrl`.
   */
  url: string;
  /**
   * Owner of the character.
   *
   * This is a convenience that ensures users cannot use access tokens not
   * belonging to them. Can be turned off with `allowAnyCharacter`.
   */
  userId?: string;
  /**
   * Data payload for POST and PUT requests.
   */
  data?: object;
  /**
   * Optional Axios configuration.
   *
   * Authorization header is automatically appended to this.
   */
  axiosConfig?: AxiosRequestConfig;
  /**
   * Allow any string as URL.
   *
   * Default `false`. **Disabling this may cause tokens to leak!**
   */
  allowUnsafeUrl?: boolean;
  /**
   * Allows executing requests without checking that the given character is
   * owned by the given user. Must be explicitly set to `true` if `userID` is
   * not given.
   *
   * **If you disable this check it is your responsibility to ensure security.
   * The access token for the given `characterEveId` will be used regardless of
   * who it belongs to!**
   */
  allowAnyCharacter?: boolean;
}
