
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserResolver } from 'src/user/user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
  controllers: [UsersController],
  providers: [UsersService, UserResolver],
})
export class UsersModule {}
