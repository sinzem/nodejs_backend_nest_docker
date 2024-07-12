import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";

/* (pipe предназначены для трансформации(например при вводе пароля в виде числа выдает ошибку, нужна строка) и валидации данных - для примера подключена при создании пользователя в users.contorller.ts) */
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value); /* (преобразует запрос в класс, нужный для валидации) */
        const errors = await validate(obj); /* (получаем ошибки после валидации) */
        
        if (errors.length) {
            let messages = errors.map(err => {
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
            })
            throw new ValidationException(messages);
        }
        return value;  /* (если нет ошибок, пропускаем запрос без изменений) */
    }
}