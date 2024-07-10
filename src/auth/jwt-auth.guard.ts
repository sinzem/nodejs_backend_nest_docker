/* (для ограничения доступа пользователя(например, незерегистрированному) к функционалу cоздают guard-скрипты) */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

/* (класс, осуществляющий функцию проверки(пример использования в user.controller.ts в getAll, глобальное ограничение - в main.ts в useGlobalGuards)) */
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {} /* (подключаем jwtService) */

    /* (встроенная функция, в которую передаем контекст, - вернет булевое значение) */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest(); /* (таким образом получаем обьект запроса из контекста) */
        try {
            const authHeader = req.headers.authorization; /* (получаем поле авторизации из заголовков - состоит из типа токена(Bearer) и самого токена(через пробел), далее получаем их по отдельности) */
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || !token) { 
                throw new UnauthorizedException({message: 'Пользователь не авторизован'}); 
            }
            const user = this.jwtService.verify(token); /* (раскодируем токен) */
            req.user = user; /* (помещаем данные из токена в запрос) */
            return true; /* (функция должна возвращать true, если пользователь авторизован) */
        } catch (e) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'}); 
        }
    }
}