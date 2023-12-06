import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Character, CharacterDocument } from "./character.model";

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  async create(character: Character): Promise<Character> {
    return this.characterModel.create(character);
  }

  async findOneByEveId(eveId: number): Promise<Character | null> {
    return this.characterModel.findOne({ eveId });
  }
}
