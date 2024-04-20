import { CloneBayEsiApiService } from "@joonashak/nestjs-clone-bay";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Some, SomeDocument } from "./some.model";

@Injectable()
export class SomeService {
  constructor(
    @InjectModel(Some.name) private someModel: Model<SomeDocument>,
    private apiService: CloneBayEsiApiService,
  ) {}

  async findAll() {
    return this.someModel.find({});
  }

  async create(some: Some) {
    return this.someModel.create(some);
  }
}
