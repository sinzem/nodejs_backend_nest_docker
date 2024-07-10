import { ApiProperty } from "@nestjs/swagger";

/* (dto - обьект для передачи данных между подсистемами - передаем в функцию в сервисах при создании юзера в таблице) */
export class CreateUserDto {
    /* (в декоратор ApiProperty передаем примеры для документации swagger) */
    @ApiProperty({example: 'user@mail.com', description: 'Почтовый адрес'}) 
    readonly email: string;
    @ApiProperty({example: '12345678', description: 'Пароль'}) 
    readonly password: string;
}