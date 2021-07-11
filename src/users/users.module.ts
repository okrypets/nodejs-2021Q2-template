import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { TaskModule } from '../tasks/tasks.module';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TaskModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}