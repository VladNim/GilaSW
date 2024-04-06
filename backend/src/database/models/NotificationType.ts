import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { validate } from "uuid";

@Entity("notification_type")
export class NotificationType {
    constructor(type: string, id?: string) {
        if (id && validate(id)) {
            this.id = id;
        }

        this.type = type;
    }

    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column()
    public type: string;

}
