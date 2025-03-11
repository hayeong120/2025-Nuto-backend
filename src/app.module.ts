import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { HomeModule } from './home/home.module';
import { BoothModule } from './booth/booth.module';
import { AccountModule } from './account/account.module';
import { MypageModule } from './mypage/mypage.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PostModule,
    HomeModule,
    BoothModule,
    AccountModule,
    MypageModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `../.env`,
    }),
    NestjsFormDataModule,
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/nuto',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
