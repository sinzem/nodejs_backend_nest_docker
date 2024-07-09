import {Module} from '@nestjs/common';
import { AppController } from './app.controller';

/* (@Module - декоратор - обертка над классом/функцией, добавляющая новый функционал) */
@Module({ 
    controllers: [AppController] /* (регистрируем контроллер) */
})
export class AppModule {

}