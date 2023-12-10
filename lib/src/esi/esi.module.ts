import { Module } from "@nestjs/common";
import { EsiService } from "./esi.service";

/** Encapsulates ESI access. */
@Module({ providers: [EsiService], exports: [EsiService] })
export class EsiModule {}
