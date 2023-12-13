import { Module } from "@nestjs/common";
import { EsiModule } from "../../esi/esi.module";
import { CharacterService } from "./character.service";

@Module({
  imports: [EsiModule],
  providers: [CharacterService],
  exports: [CharacterService],
})
export class CharacterModule {}
