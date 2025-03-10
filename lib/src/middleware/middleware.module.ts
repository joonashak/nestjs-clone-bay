import { MiddlewareConsumer, Module } from "@nestjs/common";
import { UserModule } from "../entities/user/user.module";
import { CurrentUserMiddleware } from "./current-user.middleware";

@Module({ imports: [UserModule] })
export class MiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes("*");
  }
}
