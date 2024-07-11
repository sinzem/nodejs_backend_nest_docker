/* (для ограничения доступа пользователя(например, незерегистрированному) к функционалу cоздают guard-скрипты) */
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

/* (класс, осуществляющий функцию проверки на доступ по роли пользователя(пример использования в user.controller.ts в getAll)) */
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private reflector: Reflector
    ) {}  /* (для получения роли из контекста подключаем Reflector) */

    /* (встроенная функция, в которую передаем контекст, - вернет булевое значение) */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest(); /* (таким образом получаем обьект запроса из контекста) */
        try { 
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]) /* (достанет из контекста массив ролей, которым разрешен доступ к эндпоинту) */
            if (!requiredRoles) {
                return true; /* (если ролей нет, возвращаем true - функция будет доступна всем пользователям) */
            }
            const authHeader = req.headers.authorization; /* (получаем поле авторизации из заголовков - состоит из типа токена(Bearer) и самого токена(через пробел), далее получаем их по отдельности) */
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || !token) { 
                throw new UnauthorizedException({message: 'Пользователь не авторизован'}); 
            }
            const user = this.jwtService.verify(token); /* (раскодируем токен) */
            req.user = user; /* (помещаем данные из токена в запрос) */
            return user.roles.some(role => requiredRoles.includes(role.value)); /* (функция должна возвращать true, если у пользователя есть нужная роль) */
        } catch (e) {
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN); 
        }
    }
}