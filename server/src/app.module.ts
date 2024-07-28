import { Module } from '@nestjs/common';

import { FeaturesModule } from './app/features/features.module';
import { ConfigModule } from './app/core/configs/config.module';

@Module({
  imports: [ConfigModule, FeaturesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
