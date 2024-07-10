/* (модель для создания промежуточной таблицы для связи таблиц users и roles) */
import {  Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";

@Table({tableName: 'user_roles', createdAt: false, updatedAt: false}) /* (c помощью декоратора обозначаем, что это таблица, передаем название, обозначаем отмену проставления даты создания и обновления) */
export class UserRoles extends Model<UserRoles> {

    /* (c помощью декораторов описываем каждую колонку(@Column), добавляем декораторы с описаниями для swagger) */
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    /* (с помощью ForeignKey обозначаем, что это внешние ключи, и таблицы, с которых их берем) */
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

} /* (подключаем в app.module.ts в массив с моделями и в module users и roles в импорты) */