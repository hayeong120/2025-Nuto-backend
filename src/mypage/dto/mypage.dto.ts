import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMypageDto {
  @IsString()
  @IsNotEmpty()
  member: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
