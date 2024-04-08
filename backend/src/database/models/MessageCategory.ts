import { TABLE_NAME } from "@Constants/DBConstants";
import { MessageCategoryDTO } from "@DTO/MessageCategoryDTO";
import { IMessageCategory } from "@Interface/IMessageCategory";
import { User } from "@Model/User";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

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
    users: User[];

}
