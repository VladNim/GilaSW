import { isEmail, isEmpty, isUUID } from "class-validator";
import { IUser } from "@Interface/IUser";
import { PHONE_REGEX } from "@Constants/DBConstants";

export class UserDTO implements IUser {
	public id?: string;
	public name: string;
	public email: string;
	public mobile: string;

	constructor(name: string, email: string, mobile: string, id?: string) {
		const regexMobile = new RegExp(PHONE_REGEX.VALIDATOR);

		if ( id && !isUUID(id) ) throw new Error ("Invalid UUID");
		if ( !isEmail(email) ) throw new Error ("Invalid email");
		if ( !regexMobile.test(mobile) ) throw new Error ("Invalid phone number");
		if ( isEmpty(name) ) throw new Error ("Invalid name");

		this.id = id;
		this.name = name;
		this.email = email;
		this.mobile = mobile;
	}
}