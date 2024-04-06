import { isEmail, isEmpty, isMobilePhone, isUUID } from "class-validator";
import { IUser } from "@Interface/IUser";

export class UserDTO implements IUser {
	public id?: string;
	public name: string;
	public email: string;
	public mobile: string;

	constructor(name: string, email: string, mobile: string, id?: string) {
		if ( id && !isUUID(id) ) throw new Error ("Invalid UUID");
		if ( !isEmail(email) ) throw new Error ("Invalid email");
		if ( !isMobilePhone(mobile) ) throw new Error ("Invalid phone number");
		if ( isEmpty(name) ) throw new Error ("Invalid name");

		this.id = id;
		this.name = name;
		this.email = email;
		this.mobile = mobile;
	}
}