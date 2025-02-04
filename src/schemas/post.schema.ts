import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: { createdAt: true } })
export class Post {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  password: number;

  @Prop({ required: true })
  tomato: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
