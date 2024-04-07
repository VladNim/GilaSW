import { bind } from "decko";
import { MessageCategoryRepository } from "@Repository/MessageCategoryRepository";
import { MessageCategory } from "@Model/MessageCategory";

export class MessageCategoryService {
	private readonly repo: MessageCategoryRepository = new MessageCategoryRepository();

	@bind
	async findAll(): Promise<MessageCategory[]> {
		const categories: MessageCategory[] = await this.repo.find({});

		return categories;
	}
}