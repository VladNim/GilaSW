import { SharedDataSource } from "@DataSource";
import { AbstractRepository } from "@Repository/AbstractRepository";
import { NotificationLog } from "@Model/NotificationLog";

export class NotificationLogRepository extends AbstractRepository<NotificationLog> {
	constructor() {
		super(SharedDataSource.instance.getRepository(NotificationLog));
	}
}