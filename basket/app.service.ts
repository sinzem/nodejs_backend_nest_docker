import { Injectable } from "@nestjs/common";

@Injectable() /* (для создания провайдеров используем декоратор injectable) */
export class AppService { /* (cb-функции для эндпоинтов, используем в app.controller.ts) */
    getUsers() {
        return [{id: 1, name: "Alex Smith"}];
    }
}