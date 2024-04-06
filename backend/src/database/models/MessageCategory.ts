import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { validate } from "uuid";

@Entity("message_category")
export class MessageCategory {
    constructor(name: string, id?: string) {
        if (id && validate(id)) {
            this.id = id;
        }

        this.name = name;
    }

    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column()
    public name: string;

}
