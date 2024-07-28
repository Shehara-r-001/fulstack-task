import { ConfigService } from '@nestjs/config';

import { IEnvConfig } from 'src/app/shared/models/EnvConfig.model';

const configService = new ConfigService<IEnvConfig, true>();

export const PORT = configService.get('PORT');

export const NODE_ENV = configService.get('NODE_ENV');
