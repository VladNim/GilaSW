import { BaseNotification } from "@Adapters/Notification/BaseNotification";
import { NotificationType } from "@Model/NotificationType";

export class PushNotification extends BaseNotification {
	constructor(notificationType: NotificationType) {
		super(notificationType);
	}

	public send(): void {
		console.log("Needs to send a PUSH");
	}
}