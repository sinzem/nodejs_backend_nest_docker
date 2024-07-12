import { IsNumber, IsString } from "class-validator";

/* (dto - обьект для передачи данных между подсистемами - передаем в функцию в сервисах при присвоении роли пользователю - user.service.ts) */
export class AddRoleDto {
    @IsString({message: "Должно быть строкой"}) /* (валидаторы вводимых значений, пример подключения в main.ts(глобально)) */
    readonly value: string;
    @IsNumber({}, {message: "Должно быть числовым значением"})
    readonly userId: number;
}