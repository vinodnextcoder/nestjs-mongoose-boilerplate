import { NestFactory } from "@nestjs/core";
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle("Jwt authentication mongoose nestjs example")
    .setDescription(
      "JwtService utilities module based on the nestjs/jwt package"
    )
    .setVersion("1.0")
    .addServer("http://localhost:3000/", "Local environment")
    .addServer("https://staging.yourapi.com/", "Staging")
    .addServer("https://production.yourapi.com/", "Production")
    .addTag("Jwt authentication")
    .addCookieAuth('refresh_token', {
      type: 'apiKey',
      in: 'cookie'
    },
    'refresh_token')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  app.use(cookieParser());
  await app.listen(Number(process.env.PORT) || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
