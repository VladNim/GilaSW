import { bind } from "decko";
import { NotificationTypeRepository } from "@Repository/NotificationTypeRepository";
import { NotificationType } from "@Model/NotificationType";

export class NotificationTypeService {
	private readonly repo: NotificationTypeRepository = new NotificationTypeRepository();

	@bind
	async findAll(): Promise<NotificationType[]> {
		const notificationTypes: NotificationType[] = await this.repo.find({});

		return notificationTypes;
	}
}