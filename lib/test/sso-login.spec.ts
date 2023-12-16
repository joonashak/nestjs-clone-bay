import { INestApplication } from "@nestjs/common";
import { MongooseModule, getConnectionToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import session from "express-session";
import request from "supertest";
import { AuthenticationAllowlistService } from "../src/authentication/authentication-allowlist.service";
import { AuthenticationService } from "../src/authentication/authentication.service";
import { CharacterService } from "../src/entities/character/character.service";
import { User, UserSchema } from "../src/entities/user/user.model";
import { UserService } from "../src/entities/user/user.service";
import { SsoController } from "../src/sso.controller";
import { MockEsiService } from "./mocks/esi-service.mock";
import { provideMockDynamicConfigService } from "./mocks/mock-services";
import { MockOAuthStrategy } from "./mocks/oauth.strategy.mock";
import { MockSsoService } from "./mocks/sso-service.mock";

describe("SSO login", () => {
  let app: INestApplication;

  beforeEach(async () => {
    // TODO: This is really messy, so need to make a proper testing module which mocks all the stuff that makes external requests.
    // TODO: Add entity getters to real services or write testing utilities for db models directly?
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [SsoController],
      providers: [
        AuthenticationAllowlistService,
        AuthenticationService,
        CharacterService,
        MockEsiService,
        MockOAuthStrategy,
        MockSsoService,
        provideMockDynamicConfigService(),
        UserService,
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

  afterEach(async () => {
    await app.get(getConnectionToken()).dropDatabase();
    await app.close();
  });

  it("Redirect to SSO login page", async () => {
    const res = await request(app.getHttpServer())
      .get("/sso/login")
      .expect(302)
      .redirects(0);

    expect(res.headers.location).toMatch(/^https:\/\/example.com\/authorize/);
  });

  it("New user can login via SSO", async () => {
    const res = await request(app.getHttpServer())
      .get("/sso/callback?code=asd&state=asd")
      .expect(302)
      .redirects(0);

    expect(res.headers.location).toEqual("/");
  });
});
