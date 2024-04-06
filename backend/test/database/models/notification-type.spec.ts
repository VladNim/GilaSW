import { DataSourceOptions } from "typeorm";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { SharedDataSource } from "../../../src/database/DataSource";
import { NotificationType } from "../../../src/database/models/NotificationType";
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

describe("Notification Type Database Model", () => {
	it ("Should create an object instance", () => {
		const newInstance: NotificationType = new NotificationType(faker.commerce.product(), randomUUID());

		expect(newInstance).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				type: expect.any(String)
			})
		);
	});

	it ("Should create an object instance ignoring the malformed UUID provided", () => {
		const newInstance: NotificationType = new NotificationType(faker.commerce.product(), faker.color.human());

		expect(newInstance.id).toBeUndefined();
		expect(newInstance.type).toBeTruthy();
	});
});