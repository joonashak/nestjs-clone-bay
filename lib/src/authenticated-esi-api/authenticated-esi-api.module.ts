import { Module } from "@nestjs/common";
import { CloneBayEsiApiService } from "../api/clone-bay-esi-api.service";
import { UserModule } from "../entities/user/user.module";
import { AuthenticatedEsiApiService } from "./authenticated-esi-api.service";

@Module({
  imports: [UserModule],
  providers: [AuthenticatedEsiApiService, CloneBayEsiApiService],
  exports: [AuthenticatedEsiApiService, CloneBayEsiApiService],
})
export class AuthenticatedEsiApiModule {}
