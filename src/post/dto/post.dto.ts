import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsNotEmpty()
  password: number;

  @IsNumber()
  @IsNotEmpty()
  tomato: number;
}

export class PostResponseDto {
  @IsOptional()
  _id?: string;

  name: string;
  image: string;
  content: string;
  location: string;
  password: number;
  tomato: number;

  @IsOptional()
  createdAt?: Date;
}
