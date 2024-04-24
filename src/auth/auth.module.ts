import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { LoginUserController } from './controller/loginUser.controller';
import { LoginUserService } from './service/loginUser.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
      ],
    exports: [TypeOrmModule],
    controllers: [LoginUserController],
    providers: [LoginUserService],
})
export class AuthModule {}
