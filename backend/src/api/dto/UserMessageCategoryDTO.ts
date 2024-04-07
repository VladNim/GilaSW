import { isUUID } from "class-validator";
import { IUserMessageCategoryMap } from "@Interface/IUserMessageCategoryMap";

export class UserMessageCategoryMapDTO implements IUserMessageCategoryMap {
	public userId: string;
	public messageCategoryId: string;

	constructor(userId: string, messageCategoryId: string) {
		if ( !isUUID(userId) ) throw new Error ("Invalid UUID (userId)");
		if ( !isUUID(messageCategoryId) ) throw new Error ("Invalid UUID (messageCategoryId");

		this.userId = userId;
		this.messageCategoryId = messageCategoryId;
	}
}