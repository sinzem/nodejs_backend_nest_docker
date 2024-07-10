import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles') /* (создаем контроллеры, тестируем через postman(получился localhost:5000/roles)) */
export class RolesController {
    /* (подключаем сервисы как roleService) */
    constructor(private roleService: RolesService) {}

    /* (подключаем методы из сервисов к запросам) */
    @Post()
    create(@Body() dto: CreateRoleDto) {  /* (при post-запросе передаем обьект дто сo значением и описанием) */
        return this.roleService.createRole(dto);
    }
    
    @Get('/:value') /* (get-запрос будет отрабатывать по динамическому пути) */
    getByValue(@Param('value') value: string) { /* (с помощью Param получаем этот динамический участок пути и передаем в cb-функцию) */
        return this.roleService.getRoleByValue(value);
    }
}
