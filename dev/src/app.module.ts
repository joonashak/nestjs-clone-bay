import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import {
  CloneBayModule,
  CloneBayResolversModule,
  CloneBaySsoModule,
} from "@joonashak/nestjs-clone-bay";
import { EveAuthModule } from "@joonashak/nestjs-eve-auth";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SomeModule } from "./some/some.module";

/*
 * WARNING!
 * This configuration is for local development use only. Using this kind of
 * configuration in production would be extremely dangerous.
 */

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
      ],
    }),
    EveAuthModule.forRoot({
      clientId: process.env.CLIENT_ID,
      secretKey: process.env.SECRET_KEY,
      callbackUrl: "http://localhost:3000/sso/callback",
      afterLoginUrl: "http://localhost:3000",
    }),
    CloneBayModule.forRoot({ testing: true }),
    CloneBaySsoModule,
    CloneBayResolversModule,
    SomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
