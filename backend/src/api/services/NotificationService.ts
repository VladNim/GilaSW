import { MessageCategory } from "@Model/MessageCategory";
import { MessageCategoryRepository } from "@Repository/MessageCategoryRepository";
import { bind } from "decko";

export class NotificationService {
	private readonly messageCategoryRepo: MessageCategoryRepository = new MessageCategoryRepository();

	@bind
	async send(messageCategoryId: string, message: string): Promise<void> {
		const messageCategory: MessageCategory = await this.messageCategoryRepo.repo.findOne({
			where: {
				id: messageCategoryId
			},
			relations: {
				users: true
			}
		});

		// TODO: implement send notifications by channel
		console.log("MESSAGE CATEGORY", { messageCategory });

		return;
	}
}