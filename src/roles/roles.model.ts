/* (модель для создания таблицы users в БД) */
import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
    value: string;
    description: string;
} /* (интерфейс для создания обьекта из этого класса, остальные поля не понадобятся) */

@Table({tableName: 'roles'}) /* (c помощью декоратора обозначаем, что это таблица, передаем название) */
export class Role extends Model<Role, RoleCreationAttrs> {

    /* (c помощью декораторов описываем каждую колонку(@Column), добавляем декораторы с описаниями для swagger) */
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'}) 
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'Уникальное значение роли'}) 
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'}) 
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    /* (подключаем таблицу User связью многие-ко-многим через таблицу UserRoles) */
    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
} /* (подключаем в app.module.ts в массив с моделями и в roles.module.ts в импорты) */