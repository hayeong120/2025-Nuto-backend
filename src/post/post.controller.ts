import {
  Controller,
  Post,
  Body,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as AWS from 'aws-sdk'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async uploadPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
  ): Promise<{ success: boolean; message: string }> {
    return this.postService.fileUpload(createPostDto, file);
  }

  @Delete('delete')
  async delete(
    @Body('id') id: string,
  ): Promise<{ success: boolean; message: string }> {
    return this.postService.delete(id);
  }
}
