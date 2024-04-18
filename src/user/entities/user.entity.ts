import { Entity, Column, PrimaryGeneratedColumn, Generated } from "typeorm";
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

    @Column({
        type: 'varchar',
        unique: true,
    })
    @IsEmail()
    email: string;

    @Column('varchar', {
        array: true,
        default: ['main']
    })
    status: string[];
}
