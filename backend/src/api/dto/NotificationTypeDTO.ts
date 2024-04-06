import { isEmpty, isUUID } from "class-validator";
import { INotificationType } from "@Interface/INotificationType";

export class NotificationTypeDTO implements INotificationType {
	public id?: string;
	public type: string;

	constructor(type: string, id?: string) {
		if ( id && !isUUID(id) ) throw new Error ("Invalid UUID");
		if ( isEmpty(type) ) throw new Error ("Invalid name");

		this.id = id;
		this.type = type;
	}
}