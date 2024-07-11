/* (dto - обьект для передачи данных между подсистемами - передаем в функцию в сервисах при присвоении роли пользователю - user.service.ts) */
export class AddRoleDto {
    readonly value: string;
    readonly userId: number;
}