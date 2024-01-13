import { UserAbility } from "./ability.factory";

interface IPolicyHandler {
  handle(ability: UserAbility): boolean;
}

type PolicyHandlerCallback = (ability: UserAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
