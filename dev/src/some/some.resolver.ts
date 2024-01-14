import {
  CloneBayUserService,
  RequirePolicies,
  User,
  UserAbility,
  UserAction,
  UserId,
} from "@joonashak/nestjs-clone-bay";
import { SetMetadata, UseGuards } from "@nestjs/common";
import { Mutation, Query, Resolver } from "@nestjs/graphql";
import { SomeAbility } from "./some-ability.factory";
import { SomePolicyGuard } from "./some-policy.guard";
import { Some } from "./some.model";
import { SomeService } from "./some.service";

@Resolver()
export class SomeResolver {
  constructor(
    private someService: SomeService,
    private cloneBayUserService: CloneBayUserService,
  ) {}

  @RequirePolicies((ability: UserAbility) => ability.can(UserAction.Read, User))
  @Query(() => String)
  async someQuery() {
    return "Moi";
  }

  @SetMetadata("clone-bay-check-policies", [
    (ability: SomeAbility) => ability.can(UserAction.Read, Some),
  ])
  @UseGuards(SomePolicyGuard)
  @Query(() => [Some])
  async getSomes() {
    return this.someService.findAll();
  }

  @SetMetadata("clone-bay-check-policies", [
    (ability: SomeAbility) => ability.can(UserAction.Create, Some),
  ])
  @UseGuards(SomePolicyGuard)
  @Mutation(() => Some)
  async createSome(@UserId() userId: string) {
    const user = await this.cloneBayUserService.findById(userId);
    const some = await this.someService.create({ owner: user.id });
    return some;
  }

  // @SetMetadata("clone-bay-check-policies", [
  //   (ability: SomeAbility) => ability.can(UserAction.Update, Some),
  // ])
  // @UseGuards(SomePolicyGuard)
  // @Mutation(() => Some)
  // async updateSome(@UserId() userId: string) {
  //   const user = await this.cloneBayUserService.findById(userId);
  //   const some = await this.someService.create({ owner: user.id });
  //   return some;
  // }
}
