import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { MessageCategoryDTO } from "../../../src/api/dto/MessageCategoryDTO";

describe("Message Category DTO", () => {
	it ("Should create an object instance", () => {
		const instanceDto: MessageCategoryDTO = new MessageCategoryDTO(faker.music.genre(), randomUUID());

		expect(instanceDto).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				name: expect.any(String)
			})
		);
	});

	it ("Should fail creating the objects due to validations", () => {
		const mustFailByUUID = () => {
			new MessageCategoryDTO(faker.music.genre(), faker.color.human());
		};
		const mustFailByEmptyName = () => {
			new MessageCategoryDTO("", randomUUID());
		};
		const mustFailByUndefinedName = () => {
			new MessageCategoryDTO(undefined, randomUUID());
		};

		expect(mustFailByUUID).toThrow(Error);
		expect(mustFailByEmptyName).toThrow(Error);
		expect(mustFailByUndefinedName).toThrow(Error);
	});
});