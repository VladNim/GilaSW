import { isEmpty, isUUID } from "class-validator";
import { INotificationLog } from "@Interface/INotificationLog";

export class NotificationLogDTO implements INotificationLog {
	public id?: number;
	public userId: string;
	public messageCategoryId: string;
	public notificationTypeId: string;
	public payload: string;
	public createdAt?: Date;

	constructor(userId: string, messageCategoryId: string, notificationTypeId: string, payload: string) {
		if ( userId && !isUUID(userId) ) throw new Error ("Invalid UUID (userId)");
		if ( messageCategoryId && !isUUID(messageCategoryId) ) throw new Error ("Invalid UUID (messageCategoryId)");
		if ( notificationTypeId && !isUUID(notificationTypeId) ) throw new Error ("Invalid UUID (notificationTypeId)");

		if ( isEmpty(payload) ) throw new Error ("Payload can't be empty or null");

		this.userId = userId;
		this.messageCategoryId = messageCategoryId;
		this.notificationTypeId = notificationTypeId;
		this.payload = payload;
	}
}