import { BaseNotification } from "@Adapters/Notification/BaseNotification";
import { EMailNotification } from "@Adapters/Notification/EMailNotification";
import { PushNotification } from "@Adapters/Notification/PushNotification";
import { SMSNotification } from "@Adapters/Notification/SMSNotification";
import { NotificationType } from "@Model/NotificationType";

export enum NotificationChannel {
	SMS = "SMS",
	EMAIL = "E-Mail",
	PUSH = "Push Notification"
};

export class NotificationAdapter {
	public static createNotification(notificationType: NotificationType): BaseNotification {
		switch(notificationType.type) {
			case NotificationChannel.SMS:
				return new SMSNotification(notificationType);
			
			case NotificationChannel.EMAIL:
				return new EMailNotification(notificationType);

			case NotificationChannel.PUSH:
				return new PushNotification(notificationType);
			
			default:
				throw new Error("Notification channel not implemented");
		}
	}
}