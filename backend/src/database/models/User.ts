import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserDTO } from "@DTO/UserDTO";
import { IUser } from "@Interface/IUser";

@Entity("user")
export class User implements IUser {
    constructor(userDto?: UserDTO) {
		this.id = userDto?.id;
		this.email = userDto?.email;
		this.mobile = userDto?.mobile;
        this.name = userDto?.name;
    }

    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column()
    public name: string;

	@Column()
    public email: string;

	@Column()
    public mobile: string;

}
