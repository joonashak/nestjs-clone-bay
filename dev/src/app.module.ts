import { EveAuthModule } from "@joonashak/nestjs-eve-auth";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CloneBayModule } from "nestjs-clone-bay";
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
      useFactory: async (authService: AuthService) => ({
        clientId: process.env.CLIENT_ID,
        secretKey: process.env.SECRET_KEY,
        callbackUrl: "http://localhost:3000/sso/callback",
        afterLoginUrl: "http://localhost:3000",
        service: authService,
      }),
      inject: [AuthService],
      imports: [AuthModule],
    }),
    UserModule,
    CloneBayModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
