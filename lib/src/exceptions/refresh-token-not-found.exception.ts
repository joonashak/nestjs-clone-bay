import { HttpStatus } from "@nestjs/common";
import { CloneBayException } from "./clone-bay.exception";

/**
 * @group Exceptions
 */
export class RefreshTokenNotFoundException extends CloneBayException {
  constructor() {
    super("Refresh token not found. New SSO login is required.", HttpStatus.FORBIDDEN);
  }
}
