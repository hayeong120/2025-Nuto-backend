import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../schemas/post.schema';
import { CreatePostDto } from './dto/post.dto';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

// AWS SDK 설정
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

@Injectable()
export class PostService {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
private configService: ConfigService,  ) {
    this.s3 = new AWS.S3();
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME') || 'it-show-nuto';
  }


  async fileUpload(createPostDto: CreatePostDto, file: Express.Multer.File): Promise<{ success: boolean; message: string }> {
    console.log(this.configService.get<string>('AWS_S3_BUCKET_NAME'), process.env.AWS_ACCESS_KEY)
    try {
      const uploadParams = {
        Bucket: this.bucketName,
        Key: `image/main/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: 'public-read', // 파일 접근 권한 설정
      };

      const uploadResult = await this.s3.upload(uploadParams).promise();
      
      const imageUrl = uploadResult.Location; // 업로드된 이미지의 URL

      const newPost = new this.postModel({
        ...createPostDto,
        image: imageUrl, // S3에서 반환된 이미지 URL 저장
      });

      await newPost.save();
      return { success: true, message: 'Post uploaded successfully' };
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      throw new InternalServerErrorException('Failed to upload image');
    }
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // 이미지 URL에서 S3 Key 추출
    const key = post.image.split('.com/')[1];

    // S3에서 이미지 삭제
    try {
      await this.s3.deleteObject({
        Bucket: this.bucketName,
        Key: key,
      }).promise();
    } catch (error) {
      console.error('Error deleting image from S3:', error);
      throw new InternalServerErrorException('Failed to delete image from S3');
    }

    // 게시물 삭제
    await this.postModel.findByIdAndDelete(id);
    return { success: true, message: 'Post and image deleted successfully' };
  }
}
