import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';

/* (функции для работы с таблицей ролей) */
@Injectable()
export class RolesService {

    /* (для работы понадобится модель, подключаем ее с помощью декоратора InjectModel и называем roleRepository) */
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    /* (для записи роли в БД) */
    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto);
        return role; 
    }

    /* (поиск роли в БД по значению) */
    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}});
        return role;
    }
}
