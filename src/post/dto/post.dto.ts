import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  image?: string; // S3 업로드 후 추가되기 때문에 ?로 처리

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
