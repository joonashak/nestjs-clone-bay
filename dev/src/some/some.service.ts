import { Injectable } from "@nestjs/common";
import { CloneBayUserService } from "nestjs-clone-bay";

@Injectable()
export class SomeService {
  constructor(private cloneBayUserService: CloneBayUserService) {}
}
