import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { User, UserSchema } from "./schemas/user.schema";
import { RefresToken, RefresTokenSchema } from "./schemas/refreshtoken.schema";
import { LoggerService } from "src/common/service/logger.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefresToken.name, schema: RefresTokenSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService,LoggerService],
  exports: [UserService],
})
export class UserModule {}
