class MessageCategory {
	public id: string;
	public name: string;

	constructor(apiObject: any) {
		this.id = apiObject.id;
		this.name = apiObject.name;
	}
}

export default MessageCategory;