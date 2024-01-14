import { SomeAbility } from "./some-ability.factory";

interface ISomePolicyHandler {
  handle(ability: SomeAbility): boolean;
}

type SomePolicyHandlerCallback = (ability: SomeAbility) => boolean;

export type SomePolicyHandler = ISomePolicyHandler | SomePolicyHandlerCallback;
