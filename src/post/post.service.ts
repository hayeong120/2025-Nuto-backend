import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/post.dto';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class PostService {
  private s3: S3;
  private bucketName: string;

  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private configService: ConfigService,
  ) {
    this.s3 = new S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_REGION'),
    });

    this.bucketName =
      this.configService.get<string>('AWS_S3_BUCKET_NAME') || '';
  }

  async upload(
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const uploadParams = {
        Bucket: this.bucketName,
        Key: `uploads/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };

      const uploadedFile = await this.s3.upload(uploadParams).promise();
      const imageUrl = uploadedFile.Location;

      const createdPost = new this.postModel({
        ...createPostDto,
        image: imageUrl,
      });

      await createdPost.save();

      return { success: true, message: 'Post uploaded successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to upload psot');
    }
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const deleted = await this.postModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('Post not found');
    }
    return { success: true, message: 'Post deleted successfully' };
  }
}
