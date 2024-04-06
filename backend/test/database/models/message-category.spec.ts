import { DataSourceOptions } from "typeorm";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { SharedDataSource } from "../../../src/database/DataSource";
import { MessageCategory } from "../../../src/database/models/MessageCategory";
import { MessageCategoryDTO } from "../../../src/api/dto/MessageCategoryDTO";
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
		const instanceDto: MessageCategoryDTO = new MessageCategoryDTO(faker.music.genre(), randomUUID());
		const newInstance: MessageCategory = new MessageCategory(instanceDto);

		expect(newInstance).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				name: expect.any(String)
			})
		);
	});
});