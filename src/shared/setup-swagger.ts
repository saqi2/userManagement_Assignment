import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger (app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('AHAN - User Management API')
    .setDescription('User Management APIs written in Nest.js framework')
    .addBearerAuth()
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);
}
