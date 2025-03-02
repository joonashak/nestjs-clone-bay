import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Character } from "../entities/character/character.model";
import { User } from "../entities/user/user.model";
import { UserAction } from "./user-action.enum";

type Subjects = InferSubjects<typeof User | typeof Character> | "all";

export type UserAbility = MongoAbility<[UserAction, Subjects]>;

@Injectable()
export class AbilityFactory {
  createForUser(user: User) {
    const { can: allow, build } = new AbilityBuilder<UserAbility>(createMongoAbility);

    if (user.admin) {
      allow(UserAction.Manage, "all");
    }

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
