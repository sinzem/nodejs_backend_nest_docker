import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('Пользователи') /* (декоратор для описания swagger) */
@Controller('users') /* (создаем контроллеры, тестируем через postman(получился localhost:5000/users)) */
export class UsersController {
    /* (подключаем сервисы как usersService) */
    constructor(private usersService: UsersService) {
        
    }

    @ApiOperation({summary: "Создание пользователя"}) /* (добавляем декораторы с опциями для документирования swagger) */
    @ApiResponse({status: 200, type: User}) /* (добавляем декораторы с опциями для документирования swagger) */
    /* (подключаем методы из сервисов к запросам) */
    @Post() 
    create(@Body() userDto: CreateUserDto) { /* (при post-запросе передаем обьект дто с почтой и паролем) */
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: "Получить всех пользователей"})
    @ApiResponse({status: 200, type: [User]})
    // @UseGuards(JwtAuthGuard) /* (через декоратор UseGuards подключаем guard - модуль для ограничения доступа незарегистрированым пользователям(предварительно регистрируем в импортах в user.module.ts - AuthModule)) */
    @Roles('ADMIN') /* (кастомный декоратор, добавит в контекст список ролей, которым разрешен доступ(прописываем через запятую)) */
    @UseGuards(RolesGuard) /* (через декоратор UseGuards подключаем guard - модуль для ограничения доступа) */
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: "Выдача ролей"})
    @ApiResponse({status: 200})
    @Roles('ADMIN') /* (кастомный декоратор, добавит в контекст список ролей, которым разрешен доступ(прописываем через запятую)) */
    @UseGuards(RolesGuard) /* (через декоратор UseGuards подключаем guard - модуль для ограничения доступа) */
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: "Бан пользователей"})
    @ApiResponse({status: 200})
    @Roles('ADMIN') /* (кастомный декоратор, добавит в контекст список ролей, которым разрешен доступ(прописываем через запятую)) */
    @UseGuards(RolesGuard) /* (через декоратор UseGuards подключаем guard - модуль для ограничения доступа) */
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }
}
