import { UserMessageCategoryMapDTO } from "@DTO/UserMessageCategoryDTO";
import { IUserMessageCategoryMap } from "@Interface/IUserMessageCategoryMap";
import { MessageCategory } from "@Model/MessageCategory";
import { User } from "@Model/User";
import { Entity, Column, OneToOne, JoinTable } from "typeorm";

@Entity("gs_user_message_category_map")
export class UserMessageCategoryMap implements IUserMessageCategoryMap {
    constructor(messageCategoryDto?: UserMessageCategoryMapDTO) {
        this.userId = messageCategoryDto?.userId;
        this.messageCategoryId = messageCategoryDto?.messageCategoryId;
    }

    @Column({
		name: "user_id",
		primary: true,
		nullable: false
	})
    public userId: string;

    @Column({
		name: "message_category_id",
		primary: true,
		nullable: false
	})
    public messageCategoryId: string;

	@OneToOne(() => User)
	@JoinTable()
	user?: User;

	@OneToOne(() => MessageCategory)
	@JoinTable()
	messageCategory?: MessageCategory;

}
