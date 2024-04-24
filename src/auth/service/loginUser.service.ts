import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from "../dto/login-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";


@Injectable()
export class LoginUserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async login(loginUserDto: LoginUserDto) {

        const { email, password } = loginUserDto;

        const user = await this.userRepository.findOne({
            where: { email },
            select: { email: true, password: true },
        });

        if (!user) {
            throw new UnauthorizedException(`User with email ${email} doesn't exists`);
        }

        if ( !bcrypt.compareSync(password, user.password) ) {
            throw new UnauthorizedException('Invalid credentials');
        }
          
        return user;
    }
}