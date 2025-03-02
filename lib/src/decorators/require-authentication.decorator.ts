import { UseGuards, applyDecorators } from "@nestjs/common";
import { AuthenticationGuard } from "../authentication/authentication.guard";

export const RequireAuthentication = () => applyDecorators(UseGuards(AuthenticationGuard));
