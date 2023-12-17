import { INestApplication } from "@nestjs/common";
import { MongooseModule, getConnectionToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import session from "express-session";
import request from "supertest";
import { AuthenticationAllowlistService } from "../src/authentication/authentication-allowlist.service";
import { AuthenticationService } from "../src/authentication/authentication.service";
import { DynamicConfigService } from "../src/config/dynamic-config.service";
import { CharacterService } from "../src/entities/character/character.service";
import { User, UserSchema } from "../src/entities/user/user.model";
import { UserService } from "../src/entities/user/user.service";
import { SsoController } from "../src/sso.controller";
import {
  mockDynamicConfig,
  provideMockDynamicConfigService,
} from "./mocks/dnyamic-config.service.mock";
import {
  MockEsiService,
  mockEsiCharacter,
  mockEsiCharacterId,
  mockEsiCorporation,
} from "./mocks/esi-service.mock";
import { MockOAuthStrategy } from "./mocks/oauth.strategy.mock";
import { MockSsoService } from "./mocks/sso-service.mock";

const callbackUrl = "/sso/callback?code=asd&state=asd";

describe("SSO login", () => {
  let app: INestApplication;
  let userService: UserService;
  let dynamicConfigService: DynamicConfigService;
  let findMockUser: () => Promise<User>;

  beforeEach(async () => {
    // TODO: This is really messy, so need to make a proper testing module which mocks all the stuff that makes external requests.
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
    userService = app.get(UserService);
    dynamicConfigService = app.get(DynamicConfigService);

    findMockUser = async () => {
      const user = await userService.findByCharacterEveId(mockEsiCharacterId);
      return user ? user.toObject() : null;
    };
  });

  afterEach(async () => {
    await app.get(getConnectionToken()).dropDatabase();
    await app.close();
  });

  it("Redirect to SSO login page", async () => {
    const res = await request(app.getHttpServer())
      .get("/sso/login")
      .expect(302);

    expect(res.headers.location).toMatch(/^https:\/\/example.com\/authorize/);
  });

  describe("New users", () => {
    it("New users can login via SSO", async () => {
      await request(app.getHttpServer()).get(callbackUrl).expect(302);
    });

    it("New user is created upon first login", async () => {
      await expect(findMockUser()).resolves.toBeNull();
      await request(app.getHttpServer()).get(callbackUrl).expect(302);
      await expect(findMockUser()).resolves.toMatchObject({
        main: { eveId: mockEsiCharacterId },
      });
    });

    it("New user is not created when DynamicConfig.allowNewUsers is off", async () => {
      mockDynamicConfig(dynamicConfigService, { allowNewUsers: false });
      await request(app.getHttpServer()).get(callbackUrl).expect(403);
      await expect(findMockUser()).resolves.toBeNull();
    });

    it("New user is not created when not allowed by allowlists", async () => {
      mockDynamicConfig(dynamicConfigService, {
        allowedCharacters: [97861234],
        allowedCorporations: [42103, 4320897, 54372],
        allowedAlliances: [890785423],
      });

      await request(app.getHttpServer()).get(callbackUrl).expect(403);
      await expect(findMockUser()).resolves.toBeNull();
    });

    it("New user is created when allowed by character allowlist", async () => {
      mockDynamicConfig(dynamicConfigService, {
        allowedCharacters: [mockEsiCharacterId],
      });

      await request(app.getHttpServer()).get(callbackUrl).expect(302);
      await expect(findMockUser()).resolves.toMatchObject({
        main: { eveId: mockEsiCharacterId },
      });
    });

    it("New user is created when allowed by corporation allowlist", async () => {
      mockDynamicConfig(dynamicConfigService, {
        allowedCorporations: [mockEsiCharacter.corporation_id],
      });

      await request(app.getHttpServer()).get(callbackUrl).expect(302);
      await expect(findMockUser()).resolves.toMatchObject({
        main: { eveId: mockEsiCharacterId },
      });
    });

    it("New user is created when allowed by alliance allowlist", async () => {
      mockDynamicConfig(dynamicConfigService, {
        allowedAlliances: [mockEsiCorporation.alliance_id],
      });

      await request(app.getHttpServer()).get(callbackUrl).expect(302);
      await expect(findMockUser()).resolves.toMatchObject({
        main: { eveId: mockEsiCharacterId },
      });
    });
  });
});
