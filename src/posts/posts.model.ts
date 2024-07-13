/* (модель для создания таблицы posts в БД) */
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
} /* (интерфейс для создания обьекта из этого класса, остальные поля не понадобятся) */

@Table({tableName: 'posts'}) /* (c помощью декоратора обозначаем, что это таблица, передаем название) */
export class Post extends Model<Post, PostCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.STRING})
    image: string; /* (у поста может быть изображение, прикрепляем название) */
    
    @ForeignKey(() => User) /* (сторонний ключ - id юзера) */
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User) 
    author: User /* (подключаем к таблице юзеров(в юзерах подключить соответственно)) */

} /* (подключаем в app.module.ts в массив с моделями и в user.module.ts в импорты) */