/* (dto - обьект для передачи данных между подсистемами - передаем в функцию в сервисах при забанивании пользователя - user.service.ts) */
export class BanUserDto {
    readonly userId: number;
    readonly banReason: string;
}