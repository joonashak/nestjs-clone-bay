import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Character, CharacterSchema } from "./character.model";
import { CharacterService } from "./character.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
  ],
  providers: [CharacterService],
  exports: [MongooseModule, CharacterService],
})
export class CharacterModule {}
