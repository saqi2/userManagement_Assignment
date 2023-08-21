import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { winstonConfig } from 'src/infrastructure/logger/logger';
import { setupSwagger } from 'src/shared/setup-swagger';
import { Logger } from '@nestjs/common';
import { LocaleService } from 'src/infrastructure/locales/base_locale/locales.service';
import { HttpExceptionFilter } from 'src/shared/exception-handlers/http-exception.filter';
import { ValidationPipeBadRequest } from 'src/shared/pipes/validation.pipe';

async function bootstrap () {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  // TODO set cors object
  app.enableCors();
  const localeService = app.get(LocaleService);
  const logger = app.get(Logger);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get('app.apiPrefix'));

  app.useGlobalFilters(new HttpExceptionFilter(localeService, logger));
  app.useGlobalPipes(new ValidationPipeBadRequest({ whitelist: true }));
  setupSwagger(app);
  const APP_PORT = configService.get('app.port');
  await app.listen(3000);
  Logger.verbose(
    `[Bootstrap] Server running on ==> http://localhost:${APP_PORT}/api-docs`,
  );
}

bootstrap();
