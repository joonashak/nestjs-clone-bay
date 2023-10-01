import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { UserService } from "./user/user.service";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    // EveAuthModule.forRootAsync({
    //   useFactory: async (consumerService: AuthService) => ({
    //     clientId: process.env.CLIENT_ID,
    //     secretKey: process.env.SECRET_KEY,
    //     callbackUrl: "http://localhost:3000/sso/callback",
    //     afterLoginUrl: "http://localhost:3000",
    //     service: consumerService,
    //   }),
    //   inject: [AuthService],
    //   imports: [AuthModule],
    // }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
