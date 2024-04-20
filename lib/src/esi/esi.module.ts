import { Module } from "@nestjs/common";
import { EsiService } from "./esi.service";

/** Encapsulates _internal_ ESI access. */
@Module({ providers: [EsiService], exports: [EsiService] })
export class EsiModule {}
