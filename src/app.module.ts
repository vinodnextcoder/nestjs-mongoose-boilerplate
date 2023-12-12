import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from  './users/users.module';
import { AuthModule }  from './auth/auth.module'
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    UserModule,
    AuthModule
  ]
})
export class AppModule {}
