import { HttpStatus } from "@nestjs/common";
import { CloneBayException } from "./clone-bay.exception";

/** @group Exceptions */
export class CharacterDoesNotBelongException extends CloneBayException {
  constructor() {
    super("Character does not belong to the user.", HttpStatus.FORBIDDEN);
  }
}
