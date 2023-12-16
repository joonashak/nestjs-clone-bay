import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-oauth2";

@Injectable()
export class MockOAuthStrategy extends PassportStrategy(Strategy, "eve-oauth") {
  constructor() {
    super({
      authorizationURL: "https://example.com/authorize",
      tokenURL: "https://example.com/token",
      clientID: "asd",
      clientSecret: "asd",
      callbackURL: "https://example.com/callback",
      state: true,
      scope: [],
    });
  }
}
