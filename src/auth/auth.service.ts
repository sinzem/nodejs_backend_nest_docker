import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
    /* (для егистрации потребуется UsersService, подключаем и регистрируем в auth.module.ts, для авторизации рекомендуют passportjs, но используем jwt) */
    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    /* (при входе в аккаунт валидируем данные и генерируем токен) */
    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    /* (при регистрации будет приходить обьект с почтовым адресом и паролем) */
    async registration(userDto: CreateUserDto) {
      const candidate = await this.userService.getUserByEmail(userDto.email); /* (по почтовому адресу проверяем, есть ли уже такой пользователь в БД) */
      if (candidate) { /* (HttpException в nest - класс с ошибкой - первым передаем сообщение для пользователя, вторым - статус-код) */
        throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
      }
      const hashPassword = await bcrypt.hash(userDto.password, 5); /* (хешируем пароль) */
      const user = await this.userService.createUser({...userDto, password: hashPassword}); /* (создаем запись в БД, вместо пароля прописываем захешированный пароль) */
      return this.generateToken(user); /* (на выходе из этой записи генерируем токен) */
    }

    /* (функция для генерации токена, дополнительные настройки токена не нужны - переданы при регистрации в auth.module.ts) */
    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles};
        return {
            token: this.jwtService.sign(payload)
        }
    }

    /* (приватная(используется только внутри этого сервиса - при логине) функция валидации пользователя) */
    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email); /* (ищем пользователя в БД по адресу почты) */
        const passwordEquals = await bcrypt.compare(userDto.password, user.password); /* (проверяем, совпадают ли захешированные пороли) */
        if (user && passwordEquals) { /* (лучше проверять отдельно после каждой переменной) */
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный почтовый адрес или пароль'}); /* (вернем ошибку, если что-нибудь не совпало(встроенный класс для ошибки)) */
    }
}
