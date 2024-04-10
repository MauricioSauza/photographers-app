import { userType } from "../enum/userType";
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    lastName: string;
    @IsEmail()
    email: string;
    status: userType;
}
