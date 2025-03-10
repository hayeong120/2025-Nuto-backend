import {
  Controller,
  Post,
  Body,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor({ storage: multer.memoryStorage() }))
  async uploadPost(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPostDto: CreatePostDto,
  ): Promise<{ success: boolean; message: string }> {
    // console.log(files);
    const nutoFile = files.find((file) => file.fieldname === 'nutoImage');
    const polariodFile = files.find(
      (file) => file.fieldname === 'polariodImage',
    );

    if (!nutoFile || !polariodFile) {
      return { success: false, message: '파일이 부족합니다.' };
    }

    return this.postService.fileUpload(createPostDto, [nutoFile, polariodFile]);
  }

  @Delete()
  async delete(
    @Body('id') id: string,
  ): Promise<{ success: boolean; message: string }> {
    return this.postService.delete(id);
  }
}
