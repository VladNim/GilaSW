import { MessageCategoryDTO } from "@DTO/MessageCategoryDTO";
import { IMessageCategory } from "@Interface/IMessageCategory";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

}
