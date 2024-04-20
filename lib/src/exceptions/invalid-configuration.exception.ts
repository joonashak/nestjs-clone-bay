import { HttpStatus } from "@nestjs/common";
import { CloneBayException } from "./clone-bay.exception";

export class InvalidConfigurationException extends CloneBayException {
  constructor() {
    super(
      "nestjs-clone-bay module is not correctly configured.",
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
