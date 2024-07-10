/* (модель для создания таблицы users в БД) */
import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
    email: string;
    password: string;
} /* (интерфейс для создания обьекта из этого класса, остальные поля не понадобятся) */

@Table({tableName: 'users'}) /* (c помощью декоратора обозначаем, что это таблица, передаем название) */
export class User extends Model<User, UserCreationAttrs> {

    /* (c помощью декораторов описываем каждую колонку(@Column), добавляем декораторы с описаниями для swagger) */
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'}) 
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@mail.com', description: 'Почтовый адрес'}) 
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '12345678', description: 'Пароль'}) 
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    /* (две последних колонки - отметка забаненого юзера и причина бана - в идеале вынести в отдельную таблицу) */э
    @ApiProperty({example: 'true', description: 'Забанен или нет'}) 
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'За хулиганство', description: 'Причина блокировки'}) 
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

     /* (подключаем таблицу Role связью многие-ко-многим через таблицу UserRoles) */
     @BelongsToMany(() => Role, () => UserRoles)
     roles: Role[];
} /* (подключаем в app.module.ts в массив с моделями и в user.module.ts в импорты) */