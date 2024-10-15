FROM node:12.13-alpine  
# (образ для работы - операционная система)

WORKDIR /app
# (рабочая директория)

COPY package*.json ./
# (файлы для копирования - все package)

RUN npm install
# (установит все зависимости)

COPY . .
# (скопируем все файлы)

COPY ./dist ./dist
# (скопируем dist в dist)

CMD ["npm", "run", "start:dev"]
# (команда для запуска, передаем массивом)
# (приложение настраиваем в docker-compose.yml)
# docker-compose build  - запуск сборки
# docker-compose up - запуск приложения(предварительно в .development.env меняем хост postgres с POSTGRES_HOST=localhost на POSTGRES_HOST=postgres)