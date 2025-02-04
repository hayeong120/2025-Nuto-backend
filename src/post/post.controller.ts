import { Controller, Post, Body, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, PostResponseDto } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('upload')
  async upload(
    @Body() createPostDto: CreatePostDto,
  ): Promise<{ success: boolean; message: string }> {
    return this.postService.upload(createPostDto);
  }

  @Delete('delete')
  async delete(
    @Body() id: string,
  ): Promise<{ success: boolean; message: string }> {
    return this.postService.delete(id);
  }
}
