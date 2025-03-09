import { CloneBayModule } from "@joonashak/nestjs-clone-bay";
import { EveAuthModule } from "@joonashak/nestjs-eve-auth";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChildModule } from "./child/child.module";

/*
 * WARNING!
 * This configuration is for local development use only. Using this kind of
 * configuration in production would be extremely dangerous.
 */

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: true,
    //   playground: false,
    //   plugins: [ApolloServerPluginLandingPageLocalDefault({ includeCookies: true })],
    // }),
    EveAuthModule.forRoot({
      clientId: process.env.CLIENT_ID,
      secretKey: process.env.SECRET_KEY,
      callbackUrl: "http://localhost:3000/sso/callback",
      scopes: ["esi-characters.read_titles.v1"],
    }),
    CloneBayModule.forRoot({
      afterLoginUrl: "/whoami",
      // dynamicConfigOverride: { allowNewUsers: false },
    }),
    // CloneBayCoreModule.forRoot({ afterLoginUrl: "asd" }),
    // SomeModule,
    ChildModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
