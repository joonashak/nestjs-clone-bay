import { HttpStatus } from "@nestjs/common";
import { CloneBayException } from "./clone-bay.exception";

/**
 * @group Exceptions
 */
export class UserNotFoundException extends CloneBayException {
  constructor() {
    super("User not found.", HttpStatus.NOT_FOUND);
  }
}
