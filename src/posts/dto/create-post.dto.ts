/* (обьект для создания поста) */
export class CreatePostDto {
    readonly title: string;
    readonly content: string;
    readonly userId: number; /* (в идеале для проверки доставать из токена, это упрощенный вариант) */
}