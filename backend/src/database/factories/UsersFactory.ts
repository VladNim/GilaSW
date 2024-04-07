import { PHONE_REGEX } from "@Constants/DBConstants";
import { UserDTO } from "@DTO/UserDTO";
import { User } from "@Model/User";
import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";

export const UsersFactory = setSeederFactory(User, (faker: Faker) => {
	const userDto = new UserDTO(
		faker.person.fullName(),
		faker.internet.email(),
		faker.helpers.fromRegExp(PHONE_REGEX.STRING)
	);
	const user = new User(userDto);
	return user;
});