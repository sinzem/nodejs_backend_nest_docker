/* (Создаем декоратор для roles-guards - ограничителя доступа взависимости от роли) */
import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
/* (прокидывает пришедший массив с ролями через встроенную функцию - для примера в users.controller.ts на get-запрос разрешаем доступ только админу) */