import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('API de Cadastro de usuarios')
    .setDescription(
      'Api de cadastros de usuários com autenticação, login e acesso as informações breve do cliente.',
    )
    .setVersion('1.0')
    .addTag('Usuarios')
    .build();

  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(process.env.PORT_API);
}
bootstrap();
