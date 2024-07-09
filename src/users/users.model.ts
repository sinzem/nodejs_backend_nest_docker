/* (модель для создания таблицы users в БД) */
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
    email: string;
    password: string;
} /* (интерфейс для создания обьекта из этого класса, остальные поля не понадобятся) */

@Table({tableName: 'users'}) /* (c помощью декоратора обозначаем, что это таблица, передаем название) */
export class User extends Model<User, UserCreationAttrs> {
    /* (c помощью декораторов описываем каждую колонку) */
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    /* (две последних колонки - отметка забаненого юзера и причина бана - в идеале вынести в отдельную таблицу) */
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;
} /* (подключаем в app.module.ts в массив с моделями и в user.module.ts в импорты) */