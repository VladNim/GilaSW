import { isEmpty, isUUID } from "class-validator";
import { IMessageCategory } from "@Interface/IMessageCategory";

export class MessageCategoryDTO implements IMessageCategory {
	public id?: string;
	public name: string;

	constructor(name: string, id?: string) {
		if ( id && !isUUID(id) ) throw new Error ("Invalid UUID");
		if ( isEmpty(name) ) throw new Error ("Invalid name");

		this.id = id;
		this.name = name;
	}
}