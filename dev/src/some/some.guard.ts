import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class SomeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("SomeGuard was called");
    return true;
  }
}
