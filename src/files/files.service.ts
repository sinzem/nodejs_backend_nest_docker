import * as fs from "fs";
import * as path from 'path';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

    async createFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg'; /* (создаем название из случайного значения и разрешения(в идеале разрешение брать из входящего файла)) */
            const filePath = path.resolve(__dirname, 'static'); /* (составляем путь для копирования файла) */
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true}); /* (создаем папку для добавления файлов, если такой еще не было) */
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer); /* (записываем файл по адресу со сгенерированным(достаем сам файл из буфера)) */
            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
