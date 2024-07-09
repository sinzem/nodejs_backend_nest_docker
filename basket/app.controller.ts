import {Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api') /* (подключаем контроллер(декоратор - обертку для дальнейшей функции с дополнительным функционалом), передаем в него путь, по которому будет отрабатывать) */
export class AppController {

    /* (dependence injection - подключаем сервисы, не создаем экземпляр класса, а пользуемся методами) */
    constructor(private appService: AppService) {} /* (dependence injection - подключаем сервисы, не ) */

    @Get('/users')  /* (также декоратор с путем для следующей функции - получаем эндпоинт /api/users - callback) */
    getUsers() {
        return this.appService.getUsers();
    }
} /* (экспортируем, подключаем в app.module.ts) */