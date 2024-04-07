import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { UserDTO } from "../../../src/api/dto/UserDTO";
import { PHONE_REGEX } from "../../../src/utils/constants/DBConstants";

describe("User DTO", () => {
	it ("Should create an object instance", () => {
		const instanceDto: UserDTO = new UserDTO(
			faker.person.fullName(),
			faker.internet.email(),
			faker.helpers.fromRegExp(PHONE_REGEX.STRING),
			randomUUID()
		);

		expect(instanceDto).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				name: expect.any(String),
				email: expect.any(String),
				mobile: expect.any(String)
			})
		);
	});

	it ("Should fail creating the objects due to validations", () => {
		const uuid = randomUUID();
		const mustFailByUUID = () => {
			new UserDTO(
				faker.person.fullName(),
				faker.internet.email(),
				faker.helpers.fromRegExp(PHONE_REGEX.STRING),
				faker.color.human()
			);
		};
		const mustFailByEmptyName = () => {
			new UserDTO(
				"",
				faker.internet.email(),
				faker.helpers.fromRegExp(PHONE_REGEX.STRING),
				uuid
			);
		};
		const mustFailByUndefinedName = () => {
			new UserDTO(
				undefined,
				faker.internet.email(),
				faker.helpers.fromRegExp(PHONE_REGEX.STRING),
				uuid
			);
		};
		const mustFailByInvalidEmail = () => {
			new UserDTO(
				faker.person.fullName(),
				faker.lorem.sentence(),
				faker.helpers.fromRegExp(PHONE_REGEX.STRING),
				uuid
			);
		};
		const mustFailByInvalidMobile = () => {
			new UserDTO(
				faker.person.fullName(),
				faker.internet.email(),
				faker.lorem.sentence(),
				uuid
			);
		};

		expect(mustFailByUUID).toThrow(Error);
		expect(mustFailByEmptyName).toThrow(Error);
		expect(mustFailByUndefinedName).toThrow(Error);
		expect(mustFailByInvalidEmail).toThrow(Error);
		expect(mustFailByInvalidMobile).toThrow(Error);
	});
});