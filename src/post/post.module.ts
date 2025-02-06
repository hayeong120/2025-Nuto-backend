import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post, PostSchema } from '../schemas/post.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]), // 모델 등록
    ConfigModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService], // 다른 모듈에서 사용할 경우 exports 추가
})
export class PostModule {}
