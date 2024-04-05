import { Entity, Column, PrimaryGeneratedColumn, Generated } from "typeorm";
import { userType } from "../enum/userType";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @Generated("uuid")
    user_id: string;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column({ type: "varchar" })
    status: userType;

}
