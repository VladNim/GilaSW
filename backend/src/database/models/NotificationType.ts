import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { INotificationType } from "@Interface/INotificationType";
import { NotificationTypeDTO } from "@DTO/NotificationTypeDTO";
import { User } from "@Model/User";
import { TABLE_NAME } from "@Constants/DBConstants";
import { NotificationLog } from "@Model/NotificationLog";

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

    @ManyToMany(() => User)
    @JoinTable({
        name: TABLE_NAME.USER_NOTIFICATION_TYPE_MAP,
        joinColumn: {
            name: "notification_type_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        }
    })
    public users?: User[];

    @OneToMany(() => NotificationLog, (notificationLog) => notificationLog.notificationType)
    public notificationLogs?: NotificationLog[];

}
