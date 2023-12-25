import { Query, Resolver } from "@nestjs/graphql";
import { RequireAuthentication } from "../../decorators/require-authentication.decorator";
import { UserId } from "../../decorators/user-id.decorator";

@Resolver()
export class UserResolver {
  @RequireAuthentication()
  @Query(() => String)
  async test(@UserId() userId: string) {
    return userId;
  }
}
