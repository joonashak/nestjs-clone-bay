import { SetMetadata } from "@nestjs/common";
import { PolicyHandler } from "./policy-handler.interface";

export const CHECK_POLICIES_KEY = "clone-bay-check-policies";

export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
