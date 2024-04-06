import { bind } from "decko";
import { NotificationTypeRepository } from "@Repository/NotificationTypeRepository";
import { NotificationType } from "@Model/NotificationType";

export class NotificationTypeService {
	private readonly notificationTypeRepo: NotificationTypeRepository = new NotificationTypeRepository();

	@bind
	async findAll(): Promise<NotificationType[]> {
		const notificationTypes: NotificationType[] = await this.notificationTypeRepo.find({});

		return notificationTypes;
	}
}