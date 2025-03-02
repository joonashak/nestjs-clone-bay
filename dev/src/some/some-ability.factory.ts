import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  createMongoAbility,
} from "@casl/ability";
import { User, UserAction } from "@joonashak/nestjs-clone-bay";
import { Injectable } from "@nestjs/common";
import { Some } from "./some.model";

type Subjects = InferSubjects<typeof User | typeof Some> | "all";

export type SomeAbility = MongoAbility<[UserAction, Subjects]>;

@Injectable()
export class SomeAbilityFactory {
  createForUser(user: User) {
    const { can: allow, build } = new AbilityBuilder<SomeAbility>(createMongoAbility);

    if (user.admin) {
      allow(UserAction.Manage, Some);
    }

    // FIXME: UserAction is not the right name...
    allow(UserAction.Create, Some);
    // allow(UserAction.Read, Some, { owner: user.main.eveId });

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
