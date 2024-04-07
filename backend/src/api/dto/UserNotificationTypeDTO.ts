import { isUUID } from "class-validator";
import { IUserNotificationTypeMap } from "@Interface/IUserNotificationTypeMap";

export class UserNotificationTypeMapDTO implements IUserNotificationTypeMap {
	public userId: string;
	public notificationTypeId: string;

	constructor(userId: string, notificationTypeId: string) {
		if ( !isUUID(userId) ) throw new Error ("Invalid UUID (userId)");
		if ( !isUUID(notificationTypeId) ) throw new Error ("Invalid UUID (notificationTypeId");

		this.userId = userId;
		this.notificationTypeId = notificationTypeId;
	}
}