import { NestFactory } from "@nestjs/core";
import MongoStore from "connect-mongo";
import "dotenv/config";
import session from "express-session";
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

  await app.listen(3000);
}
bootstrap();
