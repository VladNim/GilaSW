import { NotificationLog } from "@Model/NotificationLog";
import { NotificationType } from "@Model/NotificationType";

export abstract class BaseNotification {
	notificationType: NotificationType;

	constructor(notificationType: NotificationType) {
		this.notificationType = notificationType;
	}

	abstract sendPlainText(messageCategoryId: string, userId: string, message: string): Promise<NotificationLog>;
}