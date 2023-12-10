import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EsiModule } from "../../esi/esi.module";
import { Character, CharacterSchema } from "./character.model";
import { CharacterService } from "./character.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
    EsiModule,
  ],
  providers: [CharacterService],
  exports: [MongooseModule, CharacterService],
})
export class CharacterModule {}
