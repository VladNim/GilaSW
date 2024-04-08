import { BaseNotification } from "@Adapters/Notification/BaseNotification";
import { NotificationType } from "@Model/NotificationType";

export class SMSNotification extends BaseNotification {
	constructor(notificationType: NotificationType) {
		super(notificationType);
	}

	public send(): void {
		console.log("Needs to send an SMS");
	}
}