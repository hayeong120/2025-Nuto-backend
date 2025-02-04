import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async upload(
    createPostDto: any,
  ): Promise<{ success: boolean; message: string }> {
    const createdPost = await this.postModel.create(createPostDto);

    if (createdPost) {
      return {
        success: true,
        message: 'success to create post',
      };
    } else {
      throw new InternalServerErrorException('게시글 생성에 실패했습니다.');
    }
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const deletePost = await this.postModel.deleteOne({
      _id: id, // 몽고에서는 id가 스트링이면 objectid로 자동 변환해준다!
    });

    if (deletePost) {
      return {
        success: true,
        message: 'success to delete post',
      };
    } else {
      throw new NotFoundException('해당 게시글이 존재하지 않습니다.');
    }
  }
}
