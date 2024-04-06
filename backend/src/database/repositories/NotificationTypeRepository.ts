import { SharedDataSource } from "@DataSource";
import { AbstractRepository } from "@Repository/AbstractRepository";
import { NotificationType } from "@Model/NotificationType";

export class NotificationTypeRepository extends AbstractRepository<NotificationType> {
	constructor() {
		super(SharedDataSource.instance.getRepository(NotificationType));
	}
}