import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  // booth_id를 이용한 로직 처리
  async getBoothId(boothId: string): Promise<any> {
    return { booth_id: boothId, message: 'Booth ID를 성공적으로 가져왔습니다.' };
  }
}
