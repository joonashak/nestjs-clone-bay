import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class EveAccessToken {
  @Field()
  eveId: number;

  @Field(() => String, { nullable: true })
  accessToken: string | undefined;
}
