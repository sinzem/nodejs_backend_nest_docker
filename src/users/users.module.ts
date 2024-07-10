import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]), /* (подключаем модели используемых таблиц(User будет связан с Role как многие-ко-многим через таблицу UserRole)) */
    RolesModule, /* (подключаем модуль для работы с ролями - при создании пользователя нужно сразу прописать ему роль) */
    forwardRef(() => AuthModule), /* (эти модули(UsersModule и AuthModule) подключены друг в друге - оборачиваем в forwardRef, чтобы избежать круговой зависимости) */
  ],
  exports: [
    UsersService
  ] /* (экспортируем сервисы - понадобятся при регистрации пользователя) */
})
export class UsersModule {}
