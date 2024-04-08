import { TABLE_NAME } from "@Constants/DBConstants";
import { MessageCategoryDTO } from "@DTO/MessageCategoryDTO";
import { IMessageCategory } from "@Interface/IMessageCategory";
import { NotificationLog } from "@Model/NotificationLog";
import { User } from "@Model/User";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";

@Entity("message_category")
export class MessageCategory implements IMessageCategory {
    constructor(messageCategoryDto?: MessageCategoryDTO) {
        this.id = messageCategoryDto?.id;
        this.name = messageCategoryDto?.name;
    }

    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column()
    public name: string;

    @ManyToMany(() => User)
    @JoinTable({
        name: TABLE_NAME.USER_MESSAGE_CATEGORY_MAP,
        joinColumn: {
            name: "message_category_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        }
    })
    public users?: User[];

    @OneToMany(() => NotificationLog, (notificationLog) => notificationLog.messageCategory)
    public notificationLogs?: NotificationLog[];

}
