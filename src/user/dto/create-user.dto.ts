import { IsNotEmpty, IsEmail, IsOptional, IsArray } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    lastName: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsArray()
    @IsOptional()
    status: string[];
}
