import ApiService from "../ApiService";
import MessageCategory from "../classes/MessageCategory";

class MessageCategoryService extends ApiService {
	private path: string = "/message-categories";

	public async getMessageCategories () {
		const response = await this.get(this.path);
		const {
			data: { 
				categories
			}
		} = response;

		const messageCategories: MessageCategory[] = categories.map((category: any) => new MessageCategory(category));
		return messageCategories;
	}
}

export default MessageCategoryService;