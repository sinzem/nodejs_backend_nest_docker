import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles]) /* (подключаем модели используемых таблиц(User будет связан с Role как многие-ко-многим через таблицу UserRole)) */
  ], 
  exports: [
    RolesService
  ] /* (экспортируем модуль - он понадобится при создании записи пользователя(нужно сразу определить какую-нибудь роль - используем в user.service.ts)) */
})
export class RolesModule {}
