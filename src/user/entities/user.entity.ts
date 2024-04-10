import { Entity, Column, PrimaryGeneratedColumn, Generated } from "typeorm";
import { userType } from "../enum/userType";
import { IsNotEmpty, IsEmail } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @Generated("uuid")
    @IsNotEmpty()
    userId: string;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    lastName: string;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Column({ type: "varchar", default: "main" })
    status: userType;

}
