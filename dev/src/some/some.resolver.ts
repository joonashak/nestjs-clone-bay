import {
  RequirePolicies,
  User,
  UserAbility,
  UserAction,
} from "@joonashak/nestjs-clone-bay";
import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class SomeResolver {
  @RequirePolicies((ability: UserAbility) => ability.can(UserAction.Read, User))
  @Query(() => String)
  async someQuery() {
    return "Moi";
  }
}
