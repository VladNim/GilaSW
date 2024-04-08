import { BaseNotification } from "@Adapters/Notification/BaseNotification";
import { NotificationAdapter } from "@Adapters/Notification/NotificationAdapter";
import { MessageCategory } from "@Model/MessageCategory";
import { NotificationLog } from "@Model/NotificationLog";
import { User } from "@Model/User";
import { MessageCategoryRepository } from "@Repository/MessageCategoryRepository";
import { NotificationLogRepository } from "@Repository/NotificationLogRepository";
import { bind } from "decko";

export class NotificationService {
	private readonly messageCategoryRepo: MessageCategoryRepository = new MessageCategoryRepository();
	private readonly notificationLogRepo: NotificationLogRepository = new NotificationLogRepository();

	@bind
	public async send(messageCategoryId: string, message: string): Promise<void> {
		const messageCategory: MessageCategory = await this.messageCategoryRepo.repo.findOne({
			where: {
				id: messageCategoryId
			},
			relations: {
				users: {
					notificationTypes: true
				}
			}
		});

		const { users } = messageCategory;
		users.map(user => this.sendToUser(messageCategoryId, user, message));
	}

	@bind
	public async sendToUser(messageCategoryId, user: User, message: string): Promise<void> {
		const promises = user.notificationTypes.map(notificationType => {
			const notification: BaseNotification = NotificationAdapter.createNotification(notificationType);
			return notification.sendPlainText(messageCategoryId, user.id, message);
		});

		const newInstances: NotificationLog[] = [];
		const results = await Promise.allSettled(promises);
		results.forEach(response => {
			if (response.status === "fulfilled") {
				newInstances.push(response.value);
			}
		});
		
		await this.notificationLogRepo.repo.save(newInstances);
	}
}