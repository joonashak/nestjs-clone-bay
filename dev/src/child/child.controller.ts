import { RemoveMeService } from "@joonashak/nestjs-clone-bay";
import { Controller, Get } from "@nestjs/common";

@Controller()
export class ChildController {
  constructor(private removeMeService: RemoveMeService) {}

  @Get("child")
  async child() {
    return this.removeMeService.doSomethingBasedOnConfig();
  }
}
