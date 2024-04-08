import { BaseNotification } from "@Adapters/Notification/BaseNotification";
import { NotificationLogDTO } from "@DTO/NotificationLogDTO";
import { NotificationLog } from "@Model/NotificationLog";
import { NotificationType } from "@Model/NotificationType";

export class PushNotification extends BaseNotification {
	constructor(notificationType: NotificationType) {
		super(notificationType);
	}

	public async sendPlainText(messageCategoryId: string, userId: string, message: string): Promise<NotificationLog> {
		console.log("Needs to send a PUSH", { message });

		const data = {
			message
		};
		
		const notificationLogDto: NotificationLogDTO = new NotificationLogDTO(
			userId,
			messageCategoryId,
			this.notificationType.id,
			JSON.stringify(data)
		);
		const notificationLog: NotificationLog = new NotificationLog(notificationLogDto);

		return notificationLog;
	}
}