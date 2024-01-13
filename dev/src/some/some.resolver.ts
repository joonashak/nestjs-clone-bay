import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { SomeGuard } from "./some.guard";

@Resolver()
export class SomeResolver {
  @UseGuards(SomeGuard)
  @Query(() => String)
  async someQuery() {
    return "Moi";
  }
}
