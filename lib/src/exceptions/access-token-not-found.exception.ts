import { HttpStatus } from "@nestjs/common";
import { CloneBayException } from "./clone-bay.exception";

/**
 * @group Exceptions
 */
export class AccessTokenNotFoundException extends CloneBayException {
  constructor() {
    super("Access token not found. New SSO login may be required.", HttpStatus.FORBIDDEN);
  }
}
