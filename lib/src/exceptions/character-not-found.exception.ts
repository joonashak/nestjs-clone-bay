import { HttpStatus } from "@nestjs/common";
import { CloneBayException } from "./clone-bay.exception";

/**
 * @group Exceptions
 */
export class CharacterNotFoundException extends CloneBayException {
  constructor() {
    super("Character not found.", HttpStatus.NOT_FOUND);
  }
}
