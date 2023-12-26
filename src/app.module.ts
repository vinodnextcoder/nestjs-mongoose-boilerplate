import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from  './users/users.module';
import { AuthModule }  from './auth/auth.module'
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from './common/service/logger.service';
import { LoggerMiddleware } from './common/service/loggermiddleware.service';
console.log(`${process.cwd()}/.env.${process.env.NODE_ENV}`)

@Module({
  imports: [
    ConfigModule.forRoot({   
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      isGlobal: true  
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    AuthModule
  ],
  providers: [
    LoggerService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
