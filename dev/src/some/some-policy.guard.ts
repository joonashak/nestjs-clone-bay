import {
  CloneBayUserService,
  USER_ID_KEY_IN_SESSION,
} from "@joonashak/nestjs-clone-bay";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { SomeAbility, SomeAbilityFactory } from "./some-ability.factory";
import { SomePolicyHandler } from "./some-policy-handler.interface";

const getRequest = (context: ExecutionContext) => {
  if (context.getType() === "http") {
    return context.switchToHttp().getRequest();
  }

  if (context.getType<GqlContextType>() === "graphql") {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }
};

export default getRequest;

@Injectable()
export class SomePolicyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: SomeAbilityFactory,
    private userService: CloneBayUserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<SomePolicyHandler[]>(
        "clone-bay-check-policies",
        context.getHandler(),
      ) || [];

    const request = getRequest(context);
    const userId = request.session[USER_ID_KEY_IN_SESSION];
    const user = await this.userService.findById(userId);
    const ability = this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: SomePolicyHandler, ability: SomeAbility) {
    if (typeof handler === "function") {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
