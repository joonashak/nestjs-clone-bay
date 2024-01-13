import { CloneBayUserService } from "@joonashak/nestjs-clone-bay";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SomeService {
  constructor(private cloneBayUserService: CloneBayUserService) {}
}
