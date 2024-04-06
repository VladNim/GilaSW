import { DataSourceOptions } from "typeorm";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { SharedDataSource } from "../../../src/database/DataSource";
import { MessageCategory } from "../../../src/database/models/MessageCategory";
import { BASE_TEST_DATA_SOURCE } from "../../constants";

beforeAll(async() => {
	const dataSource: DataSourceOptions = {
		...BASE_TEST_DATA_SOURCE,
		migrationsRun: false
	};

	await SharedDataSource.initialize(dataSource);
});

afterAll(async() => {
	await SharedDataSource.instance.destroy();
});

describe("Message Category Database Model", () => {
	it ("Should create an object instance", () => {
		const newInstance: MessageCategory = new MessageCategory(faker.music.genre(), randomUUID());

		expect(newInstance).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				name: expect.any(String)
			})
		);
	});

	it ("Should create an object instance ignoring the malformed UUID provided", () => {
		const newInstance: MessageCategory = new MessageCategory(faker.music.genre(), faker.color.human());

		expect(newInstance.id).toBeUndefined();
		expect(newInstance.name).toBeTruthy();
	});
});