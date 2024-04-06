import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { NotificationTypeDTO } from "../../../src/api/dto/NotificationTypeDTO";

describe("Notification Type DTO", () => {
	it ("Should create an object instance", () => {
		const instanceDto: NotificationTypeDTO = new NotificationTypeDTO(faker.commerce.product(), randomUUID());

		expect(instanceDto).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				type: expect.any(String)
			})
		);
	});

	it ("Should fail creating the objects due to validations", () => {
		const mustFailByUUID = () => {
			new NotificationTypeDTO(faker.commerce.product(), faker.color.human());
		};
		const mustFailByEmptyType = () => {
			new NotificationTypeDTO("", randomUUID());
		};
		const mustFailByUndefinedType = () => {
			new NotificationTypeDTO(undefined, randomUUID());
		};

		expect(mustFailByUUID).toThrow(Error);
		expect(mustFailByEmptyType).toThrow(Error);
		expect(mustFailByUndefinedType).toThrow(Error);
	});
});