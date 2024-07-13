import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image')) /* (для работы с загружаемыми файлами) */
    createPost(@Body() dto: CreatePostDto, 
               @UploadedFile() image) { /* (декоратор для работы/получения с файлами) */
        return this.postService.create(dto, image)
    }

}
