import { INestApplication } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import session from "express-session";
import { AuthenticationAllowlistService } from "../src/authentication/authentication-allowlist.service";
import { AuthenticationService } from "../src/authentication/authentication.service";
import { CharacterService } from "../src/entities/character/character.service";
import { AltService } from "../src/entities/user/alt.service";
import { UserCacheService } from "../src/entities/user/user-cache.service";
import { User, UserSchema } from "../src/entities/user/user.model";
import { UserService } from "../src/entities/user/user.service";
import { SsoController } from "../src/sso/sso.controller";
import { SsoService } from "../src/sso/sso.service";
import { MockCacheService } from "./mocks/cache.service.mock";
import { provideMockDynamicConfigService } from "./mocks/dynamic-config.service.mock";
import { MockEsiService } from "./mocks/esi-service.mock";
import { provideMockModuleConfigService } from "./mocks/mock-module-config";
import { MockOAuthStrategy } from "./mocks/oauth.strategy.mock";
import { MockSsoService } from "./mocks/sso-service.mock";

export const createTestingApp = async (): Promise<INestApplication> => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    throw new Error("Integration test missing `MONGO_URL` env var.");
  }

  const module = await Test.createTestingModule({
    imports: [
      MongooseModule.forRoot(mongoUrl),
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
      provideMockModuleConfigService(),
      provideMockDynamicConfigService(),
      MockCacheService,
      UserService,
      UserCacheService,
      AltService,
      SsoService,
    ],
  }).compile();

  const app = module.createNestApplication();
  app.use(
    session({
      secret: "my-secret",
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.init();
  return app;
};
