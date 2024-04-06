import { SharedDataSource } from "@DataSource";
import { MessageCategory } from "@Model/MessageCategory";
import { AbstractRepository } from "@Repository/AbstractRepository";

export class MessageCategoryRepository extends AbstractRepository<MessageCategory> {
	constructor() {
		super(SharedDataSource.instance.getRepository(MessageCategory));
	}
}