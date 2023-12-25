import { Query, Resolver } from "@nestjs/graphql";
import { RequireAuthentication } from "../../decorators/require-authentication.decorator";

@Resolver()
export class UserResolver {
  @RequireAuthentication()
  @Query(() => String)
  async test() {
    return "moi";
  }
}
