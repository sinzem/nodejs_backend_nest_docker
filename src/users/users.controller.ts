import {Body, Controller, Get, Post} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users') /* (создаем контроллеры, тестируем через postman(получился localhost:5000/users)) */
export class UsersController {
    /* (подключаем сервисы как usersService) */
    constructor(private usersService: UsersService) {
        
    }

    /* (подключаем методы из сервисов к запросам) */
    @Post() 
    create(@Body() userDto: CreateUserDto) { /* (при post-запросе передаем обьект дто с почтой и паролем) */
        return this.usersService.createUser(userDto);
    }

    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }
}
