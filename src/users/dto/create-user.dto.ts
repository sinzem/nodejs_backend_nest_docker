/* (dto - обьект для передачи данных между подсистемами - передаем в функцию в сервисах при создании юзера в таблице) */
export class CreateUserDto {
    readonly email: string;
    readonly password: string;
}