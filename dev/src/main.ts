import { NestFactory } from "@nestjs/core";
import MongoStore from "connect-mongo";
import "dotenv/config";
import session from "express-session";
import mongoose from "mongoose";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: "my-secret",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
      }),
    }),
  );
  mongoose.set("debug", true);
  await app.listen(3000);
}
bootstrap();
