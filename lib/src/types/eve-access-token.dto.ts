import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class EveAccessToken {
  @Field()
  eveId: number;

  @Field()
  accessToken: string;
}
