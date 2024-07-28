import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersProvider } from './users.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersProvider],
})
export class UsersModule {}
