import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [ /* (регистрируем подключаемые сторонние модули) */
    forwardRef(() => UsersModule), /* (эти модули(UsersModule и AuthModule) подключены друг в друге - оборачиваем в forwardRef, чтобы избежать круговой зависимости) */
    JwtModule.register({ /* (подключаем модуль для генерации токенов и сразу регистрируем - передаем секретное слово и время существования) */
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports: [ /* (экспортируем модули, которые могут понадобиться в других модулях) */
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
