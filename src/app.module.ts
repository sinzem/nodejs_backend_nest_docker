import {Module} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/posts.model';

/* (@Module - декоратор - обертка над классом/функцией, добавляющая новый функционал) */
@Module({ 
    controllers: [], /* (регистрируем контроллер(эндпоинты)) */
    providers: [], /* (провайдеры - массив с переиспользуемыми компонентами логики, например сервисами) */
    imports: [ /* (imports - массив для подключения импортированных модулей) */
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env` /* (с помощью cross-env модуля при запуске передаем переменную NODE_ENV - production или development) */
        }), /* (пример подключения конфигов с переменными env) */
        SequelizeModule.forRoot({ /* (фреймворк для работы с БД) */
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST, /* ('localhost') */
          port: Number(process.env.POSTGRESS_PORT), /* (5432 - по умолчанию) */
          username: process.env.POSTGRES_USER, /* (postgres - по умолчанию) */
          password: process.env.POSTGRESS_PASSWORD, /* (код доступа к БД) */
          database: process.env.POSTGRES_DB, /* (имя подключаемой БД) */
          models: [User, Role, UserRoles, Post], /* (модели подключаемых таблиц) */
          autoLoadModels: true /* (разрешение для sequelize создавать таблицы в БД на основе моделей(выше)) */
        }), UsersModule, RolesModule, AuthModule, PostsModule,
    ],
})
export class AppModule {}