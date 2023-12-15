import { EveAuthModule } from "@joonashak/nestjs-eve-auth";
import { INestApplication } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import session from "express-session";
import request from "supertest";
import { CloneBayModule } from "../src";

describe("SSO login", () => {
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
    app.use(
      session({
        secret: "my-secret",
        resave: false,
        saveUninitialized: false,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Redirect to SSO login page", async () => {
    const res = await request(app.getHttpServer())
      .get("/sso/login")
      .expect(302)
      .redirects(0);

    expect(res.headers.location).toMatch(
      /^https:\/\/login.eveonline.com\/v2\/oauth\/authoriz/,
    );
  });
});
