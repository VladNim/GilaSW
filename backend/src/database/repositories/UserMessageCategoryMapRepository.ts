import { SharedDataSource } from "@DataSource";
import { UserMessageCategoryMap } from "@Model/UserMessageCategoryMap";
import { AbstractRepository } from "@Repository/AbstractRepository";

export class UserMessageCategoryMapRepository extends AbstractRepository<UserMessageCategoryMap> {
	constructor() {
		super(SharedDataSource.instance.getRepository(UserMessageCategoryMap));
	}
}