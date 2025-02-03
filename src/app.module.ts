import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { HomeModule } from './home/home.module';
import { GetModule } from './get/get.module';
import { BoothModule } from './booth/booth.module';
import { AccountModule } from './account/account.module';
import { MypageModule } from './mypage/mypage.module';
import { HomoeService } from './homoe/homoe.service';

@Module({
  imports: [PostModule, HomeModule, GetModule, BoothModule, AccountModule, MypageModule],
  controllers: [AppController],
  providers: [AppService, HomoeService],
})
export class AppModule {}
