import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EveAuthModule } from "nestjs-eve-auth";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { UserModule } from "./user/user.module";
import { UserService } from "./user/user.service";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    EveAuthModule.forRootAsync({
      useFactory: async (consumerService: AuthService) => ({
        clientId: process.env.CLIENT_ID,
        secretKey: process.env.SECRET_KEY,
        callbackUrl: "http://localhost:3000/sso/callback",
        afterLoginUrl: "http://localhost:3000",
        service: consumerService,
      }),
      inject: [AuthService],
      imports: [AuthModule],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
