import { HttpException, HttpStatus } from "@nestjs/common";

/* (класс для валидации ошибок, добавит сообщение к уже существующему) */
export class ValidationException extends HttpException {
    messages;
    
    constructor(response) {
        super(response, HttpStatus.BAD_REQUEST);
        this.messages = response;
    }
}