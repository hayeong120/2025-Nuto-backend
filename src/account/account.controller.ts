import { Controller, Get, Param } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':booth_id')
  async getBoothId(@Param('booth_id') boothId: string) {
    return this.accountService.getBoothId(boothId);
  }
}
