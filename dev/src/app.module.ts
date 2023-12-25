import { EveAuthModule } from "@joonashak/nestjs-eve-auth";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CloneBayModule,
  CloneBayResolversModule,
  CloneBaySsoModule,
} from "nestjs-clone-bay";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    EveAuthModule.forRoot({
      clientId: process.env.CLIENT_ID,
      secretKey: process.env.SECRET_KEY,
      callbackUrl: "http://localhost:3000/sso/callback",
      afterLoginUrl: "http://localhost:3000",
    }),
    // EveAuthModule.forRootAsync({
    //   useFactory: async (authService: AuthService) => ({
    //     clientId: process.env.CLIENT_ID,
    //     secretKey: process.env.SECRET_KEY,
    //     callbackUrl: "http://localhost:3000/sso/callback",
    //     afterLoginUrl: "http://localhost:3000",
    //     service: authService,
    //   }),
    //   inject: [AuthService],
    //   imports: [AuthModule],
    // }),
    CloneBayModule.forRoot({ testing: true }),
    CloneBaySsoModule,
    CloneBayResolversModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
