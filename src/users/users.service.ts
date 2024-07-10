import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable() /* (создаем класс для иньекции - cb-функции для контроллера) */
export class UsersService {
    /* (для работы понадобится модель, подключаем ее с помощью декоратора InjectModel и называем userRopository, также подключаем сервисы по созданию ролей - при добавлении пользователя ему нужно сразу определить роль) */
    constructor(@InjectModel(User) private userRepository: typeof User,
                                   private roleService: RolesService) {}

    /* (при создании записи в таблице передаем обьект с email и паролем(CreateUserDto)) */
    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER"); /* (получаем роль для пользователя из таблицы - будем присваивать по умолчанию) */
        await user.$set('roles', [role.id]); /* ($set - добавит к обьекту пользователя указанные ключ('roles') и значение) */
        user.roles = [role]; /* (добавляем к обьекту массив с ролями - понадобится при генерации токена) */
        return user;
    }

    /* (получение всех пользователей из таблицы, опция include - для определения связанных полей, all подтянет все(значения ролей, связанных с пользователем)) */
    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all:true}});
        return user;
    }
}
