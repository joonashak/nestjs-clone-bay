import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import getRequest from "../common/utils/get-request.util";
import { USER_ID_KEY_IN_SESSION } from "../constants";
import { UserService } from "../entities/user/user.service";
import { AbilityFactory, UserAbility } from "./ability.factory";
import { CHECK_POLICIES_KEY } from "./check-policies.decorator";
import { PolicyHandler } from "./policy-handler.interface";

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
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

  private execPolicyHandler(handler: PolicyHandler, ability: UserAbility) {
    if (typeof handler === "function") {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
