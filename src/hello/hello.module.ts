import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HelloController } from "./hello.controller";

@Module({
  controllers: [HelloController]
})
export class helloModule {}
