import { IsNotEmpty, IsEmail, IsOptional, IsArray, IsBoolean, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    lastName: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsBoolean()
    @IsOptional()
    isActive: boolean;
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;
    @IsArray()
    @IsOptional()
    status: string[];
}
