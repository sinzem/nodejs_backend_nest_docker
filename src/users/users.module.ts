import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]), /* (подключаем модели используемых таблиц(User будет связан с Role как многие-ко-многим через таблицу UserRole)) */
    RolesModule /* (подключаем модуль для работы с ролями - при создании пользователя нужно сразу прописать ему роль) */
  ]
})
export class UsersModule {}
