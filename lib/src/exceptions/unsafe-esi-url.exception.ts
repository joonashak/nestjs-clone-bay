import { HttpStatus } from "@nestjs/common";
import { CloneBayException } from "./clone-bay.exception";

/**
 * @group Exceptions
 */
export class UnsafeEsiUrlException extends CloneBayException {
  constructor() {
    super(
      "Unsafe URL detected. Request blocked to prevent leaking tokens to 3rd parties.",
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
