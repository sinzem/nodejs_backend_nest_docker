import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

/* (dto - обьект для передачи данных между подсистемами - передаем в функцию в сервисах при создании юзера в таблице) */
export class CreateUserDto {
    /* (в декоратор ApiProperty передаем примеры для документации swagger) */
    @ApiProperty({example: 'user@mail.com', description: 'Почтовый адрес'}) 
    @IsString({message: "Должно быть строкой"}) /* (декоратор из библиотеки для валидации) */
    @IsEmail({}, {message: "Hекорректный email"}) /* (декоратор из библиотеки для валидации) */
    readonly email: string;

    @ApiProperty({example: '12345678', description: 'Пароль'}) 
    @IsString({message: "Должно быть строкой"}) /* (декоратор из библиотеки для валидации) */
    @Length(4, 16, {message: "От 4 до 16 символов"}) /* (декоратор из библиотеки для валидации) */
    readonly password: string;
}