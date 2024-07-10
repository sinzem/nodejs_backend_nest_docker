import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [ /* (регистрируем подключаемые сторонние модули) */
    UsersModule,
    JwtModule.register({ /* (подключаем модуль для генерации токенов и сразу регистрируем - передаем секретное слово и время существования) */
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ]
})
export class AuthModule {}
