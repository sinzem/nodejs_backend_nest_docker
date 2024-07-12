import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule); /* (создаем экземпляр приложения) */

    /* (создаем конфигурацию для локументирования с помощью swagger) */
    const config = new DocumentBuilder()
        .setTitle('Урок по продвинутому BACKEND')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('ULBI TV')
        .build()
    const document = SwaggerModule.createDocument(app, config); /* (cоздаем документацию, передаем приложение и конфигурацию, в контроллере добавляем опции для описания эндпоинтов, также в моделях(users.model.ts) задаем описание каждой колонке) */
    SwaggerModule.setup('api/docs', app, document); /* (по указанному пути можно смотреть документацию(localhost:5000/api/docs)) */

    // app.useGlobalGuards(JwtAuthGuard); /* (пример глобального блокирования незарегистрированных пользователей) */

    app.useGlobalPipes(new ValidationPipe()); /* (пример глобального подключения валидации) */ 

    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();



