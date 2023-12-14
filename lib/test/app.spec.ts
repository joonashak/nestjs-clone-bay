import { EveAuthModule } from "@joonashak/nestjs-eve-auth";
import { INestApplication } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { CloneBayModule } from "../src";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CloneBayModule.forRoot({ testing: false }),
        EveAuthModule.forRoot({
          clientId: "asd",
          secretKey: "dsa",
          callbackUrl: "http://localhost:3000/sso/callback",
          afterLoginUrl: "http://localhost:3000",
        }),
        MongooseModule.forRoot(process.env.MONGO_URL),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer()).get("/").expect(404);
  });
});
