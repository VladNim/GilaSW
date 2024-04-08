import { BaseNotification } from "@Adapters/Notification/BaseNotification";
import { NotificationAdapter } from "@Adapters/Notification/NotificationAdapter";
import { MessageCategory } from "@Model/MessageCategory";
import { User } from "@Model/User";
import { MessageCategoryRepository } from "@Repository/MessageCategoryRepository";
import { bind } from "decko";

export class NotificationService {
	private readonly messageCategoryRepo: MessageCategoryRepository = new MessageCategoryRepository();

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
		users.map(user => this.sendToUser(user, message));

		return;
	}

	@bind
	public async sendToUser(user: User, message: string): Promise<void> {
		user.notificationTypes.map(notificationType => {
			const notification: BaseNotification = NotificationAdapter.createNotification(notificationType);
			notification.sendPlainText(message);
		});
	}
}