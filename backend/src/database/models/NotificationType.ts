import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { INotificationType } from "@Interface/INotificationType";
import { NotificationTypeDTO } from "@DTO/NotificationTypeDTO";

@Entity("notification_type")
export class NotificationType implements INotificationType {
    constructor(notificationTypeDto?: NotificationTypeDTO) {
        this.id = notificationTypeDto?.id;
        this.type = notificationTypeDto?.type;
    }

    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column()
    public type: string;

}
