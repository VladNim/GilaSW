import { NotificationType } from "@Model/NotificationType";

export abstract class BaseNotification {
	notificationType: NotificationType;

	constructor(notificationType: NotificationType) {
		this.notificationType = notificationType;
	}

	abstract send(): void;
}