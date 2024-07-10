/* (dto - обьект для передачи данных между подсистемами - передаем в функцию в сервисах при определении роли юзера в таблице) */
export class CreateRoleDto {
    readonly value: string;
    readonly description: string;
}