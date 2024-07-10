import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')

@ApiTags('Авторизация') /* (для документации swagger) */
@Controller('auth') /* (localhost:5000/auth) */
export class AuthController {
    
    constructor(private authService: AuthService) {} /* (подключаем сервисы) */

    /* (создаем эндпоинты) */
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }
}
