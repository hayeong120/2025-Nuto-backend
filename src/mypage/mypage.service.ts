import { Injectable } from '@nestjs/common';
import { CreateMypageDto } from './dto/mypage.dto';

@Injectable()
export class MypageService {
  async create(createMypageDto: CreateMypageDto) {
    // DB 저장 진행
    // 예시로 데이터를 로그 출력, 성공 메시지를 반환
    console.log('Received data:', createMypageDto);
    return {
      message: '데이터가 성공적으로 처리되었습니다.',
      data: createMypageDto,
    };
  }
}
