import {Controller, Get} from '@nestjs/common';

@Controller('/api') /* (подключаем контроллер(декоратор - обертку для дальнейшей функции с дополнительным функционалом), передаем в него путь, по которому будет отрабатывать) */
export class AppController {
    @Get('/users')  /* (также декоратор с путем для следующей функции - получаем эндпоинт) */
    getUsers() {
        return [{id: 1, name: "Alex Smith"}]
    }
} /* (экспортируем, подключаем в app.module.ts) */