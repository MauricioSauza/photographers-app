import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { LoginUserService } from "../service/loginUser.service";
import { LoginUserDto } from "../dto/login-user.dto";


@Controller('auth')
export class LoginUserController {
    constructor(private readonly loginUserService: LoginUserService) {}


    @Post()
    login(@Body() loginUserDto: LoginUserDto) {

        return this.loginUserService.login(loginUserDto);

    }
}