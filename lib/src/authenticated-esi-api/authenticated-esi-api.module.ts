import { Module } from "@nestjs/common";
import { AuthenticatedEsiApiService } from "./authenticated-esi-api.service";

@Module({
  providers: [AuthenticatedEsiApiService],
  exports: [AuthenticatedEsiApiService],
})
export class AuthenticatedEsiApiModule {}
