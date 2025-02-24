import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as requestIp from 'request-ip';
import { DateTime } from 'luxon';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { ResponseInterceptor } from './app/core/interceptors/response.interceptor';
import { ErrorFilter } from './app/core/filters/error.filter';
import { NodeEnvironment } from './app/shared/enums/NodeEnvironment.enum';
import { IEnvConfig } from './app/shared/models/EnvConfig.model';
import { NODE_ENV } from './app/core/constants/env.constants';
// import {
//   gloabalRequestLimiter,
//   signUpRequestLimiter,
// } from './app/shared/utils/rate-limiter';
// import { globalSlowDown, signUpSlowDown } from './app/shared/utils/slowdown';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log'],
  });

  const configService = new ConfigService<IEnvConfig>();
  const PORT = configService.get('PORT');
  const BASE_URL = configService.get('BASE_URL');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new ErrorFilter());

  app.use(requestIp.mw());

  // app.use(globalSlowDown);
  // app.use(gloabalRequestLimiter);

  // app.use('/auth/signup', signUpSlowDown);
  // app.use('/auth/signup', signUpRequestLimiter);

  app.enableCors({
    origin: '*',
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  app.use(helmet());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Leaderboard')
    .setDescription('KingIT fulstack task')
    .setVersion('1.0.0')
    .build();

  const swaggerDocs = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocs);

  await app.listen(PORT);

  Logger.log(`NODE_ENV = ${NODE_ENV}`);
  Logger.log(DateTime.local().toLocaleString(DateTime.DATETIME_FULL));
  Logger.log(
    NODE_ENV === NodeEnvironment.DEV &&
      `Server is listening on ${BASE_URL}:${PORT}/v1`
  );
  Logger.log(
    NODE_ENV === NodeEnvironment.DEV &&
      `Check the API docs on ${BASE_URL}:${PORT}/api`
  );
}
bootstrap().catch((e) => Logger.error(e));
