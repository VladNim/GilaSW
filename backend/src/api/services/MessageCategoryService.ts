import { bind } from "decko";
import { MessageCategoryRepository } from "@Repository/MessageCategoryRepository";
import { MessageCategory } from "@Model/MessageCategory";

export class MessageCategoryService {
	private readonly categoryRepo: MessageCategoryRepository = new MessageCategoryRepository();

	@bind
	async findAll(): Promise<MessageCategory[]> {
		const categories: MessageCategory[] = await this.categoryRepo.find({});

		return categories;
	}
}