import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable() /* (создаем класс для иньекции - cb-функции для контроллера) */
export class UsersService {
    /* (для работы понадобится модель, подключаем ее с помощью декоратора InjectModel и называем userRopository) */
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    /* (при создании записи в таблице передаем обьект с email и паролем(CreateUserDto)) */
    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    /* (получение всех пользователей из таблицы) */
    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }
}
