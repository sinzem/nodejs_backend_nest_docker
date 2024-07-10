/* (Приложение на nestjs(платформа для создания эффективных масштабируемых программ Node) и ts, план урока на скрине в папке basket) */

// npm i -g @nestjs/cli - установка nest(глобально)
// nest new nest-course - создаем новый проект(nest-course - название)
    // Удаляем лишнее
        // .eslinttrc.js
        // .prettierrc
        // /test
        // src очистил полностью

// В отличии от react не используем роутер, эндпоинты создаем с помощью декораторов - пример в basket/app.modules.ts и basket/app.controller.ts

// npm run start:dev - запуск

// npm i --save @nestjs/sequelize sequelize sequelize-typescript /* (фреймворк для работы с БД) */
// npm install --save-dev @types/sequelize /* (типы для sequelize) */
// npm i --save pg pg-hstore

// Скачиваем и устанавливаем Postgres, запускаем pgAdmin 4, создаем БД - пример подключения в app.module.ts

// nest generate
    // Пример создания документов через терминал - nest generate module users - в папке users создается модуль с таким же названием, заготовкой для работы внутри и автоматически помещается в импорты в app.module.ts
        // nest generate controller users
        // nest generate service users - созданные сервис и контроллер также автоматически добавились в users.module.ts
            // С последними двумя создались скрипты для тестировки - они не нужны, можно удалить

// npm i @nestjs/config - для подключения файлов конфигурации(.env с настройками,пример подключения в app.module.ts - ConfigModule в импортах)

// npm i cross-env - для передачи переменных среды в команде запуска - в package.json в командах запуска добавляем переменную с режимом разработки(от него зависит подключаемый .env-документ - в app.module.ts)

// npm i @nestjs/swagger swagger-ui-express - для документирования rest API, подключаем в main.ts, в эндпоинты и модели, в dto

// nest generate module roles - создаем модуль для управления ролями пользователя
        // nest generate service roles
        // nest generate controller roles

// nest generate module auth - создаем модуль для авторизации
        // nest generate service auth
        // nest generate controller auth
// npm i @nestjs/jwt bcryptjs - подули для генерации паролей