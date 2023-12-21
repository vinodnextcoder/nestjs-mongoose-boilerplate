import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { User, UserSchema } from "./schemas/user.schema";
import { RefresToken, RefresTokenSchema } from "./schemas/refreshtoken.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefresToken.name, schema: RefresTokenSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
