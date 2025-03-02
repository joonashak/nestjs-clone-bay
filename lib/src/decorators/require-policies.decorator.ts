import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { CHECK_POLICIES_KEY } from "../authorization/check-policies.decorator";
import { PolicyHandler } from "../authorization/policy-handler.interface";
import { PolicyGuard } from "../authorization/policy.guard";

export const RequirePolicies = (...handlers: PolicyHandler[]) =>
  applyDecorators(SetMetadata(CHECK_POLICIES_KEY, handlers), UseGuards(PolicyGuard));
