import { SsoService } from "@joonashak/nestjs-eve-auth";
import { INestApplication } from "@nestjs/common";
import { MongooseModule, getConnectionToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import session from "express-session";
import request from "supertest";
import { AuthenticationAllowlistService } from "../src/authentication/authentication-allowlist.service";
import { AuthenticationService } from "../src/authentication/authentication.service";
import { DynamicConfigService } from "../src/config/dynamic-config.service";
import { CharacterService } from "../src/entities/character/character.service";
import { UserCacheService } from "../src/entities/user/user-cache.service";
import { User, UserSchema } from "../src/entities/user/user.model";
import { UserService } from "../src/entities/user/user.service";
import { SsoController } from "../src/sso/sso.controller";
import { MockCacheService } from "./mocks/cache.service.mock";
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
  let ssoService: SsoService;
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
        MockCacheService,
        UserService,
        UserCacheService,
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
    ssoService = app.get(SsoService);

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

  describe("Existing users", () => {
    beforeEach(async () => {
      await request(app.getHttpServer()).get(callbackUrl);
    });

    it("User is updated upon login", async () => {
      const user = await userService.findByCharacterEveId(mockEsiCharacterId);
      await request(app.getHttpServer()).get(callbackUrl).expect(302);
      const updatedUser =
        await userService.findByCharacterEveId(mockEsiCharacterId);

      expect(updatedUser._id).toEqual(user._id);
      expect(updatedUser.updatedAt).not.toEqual(user.updatedAt);
    });

    it.skip("Old tokens are updated upon login", async () => {
      // TODO: Implement this test once there is a proper way to find a user with tokens (not selected by default for safety).
      const accessToken = "fjn9+4178gh3957fbg1";
      const refreshToken = "n0v58234nv";
      jest.spyOn(ssoService, "callback").mockResolvedValueOnce({
        character: { id: mockEsiCharacterId, name: mockEsiCharacter.name },
        tokens: { accessToken, refreshToken },
      });

      await request(app.getHttpServer()).get(callbackUrl).expect(302);
      const updatedUser =
        await userService.findByCharacterEveId(mockEsiCharacterId);

      expect(updatedUser.main.accessToken).toEqual(accessToken);
      expect(updatedUser.main.refreshToken).toEqual(refreshToken);
    });

    it("Existing users are allowed to login when DynamicConfig.allowNewUsers is off", async () => {
      mockDynamicConfig(dynamicConfigService, { allowNewUsers: false });
      await request(app.getHttpServer()).get(callbackUrl).expect(302);
    });

    it("Existing users are allowed to login when allowlists are in use", async () => {
      mockDynamicConfig(dynamicConfigService, { allowedCharacters: [9187623] });
      await request(app.getHttpServer()).get(callbackUrl).expect(302);
    });

    it("Existing users are denied login when allowlists are in use and DynamicConfig.applyAllowlistsToExistingUsers is on", async () => {
      mockDynamicConfig(dynamicConfigService, {
        allowedCharacters: [9187623],
        applyAllowlistsToExistingUsers: true,
      });
      await request(app.getHttpServer()).get(callbackUrl).expect(403);
    });

    it("Existing users are allowed to login when allowed by allowlists and DynamicConfig.applyAllowlistsToExistingUsers is on", async () => {
      mockDynamicConfig(dynamicConfigService, {
        allowedCharacters: [mockEsiCharacterId],
        applyAllowlistsToExistingUsers: true,
      });
      await request(app.getHttpServer()).get(callbackUrl).expect(302);
    });
  });
});
