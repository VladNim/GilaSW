import { DataSourceOptions } from "typeorm";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { SharedDataSource } from "../../../src/database/DataSource";
import { User } from "../../../src/database/models/User";
import { UserDTO } from "../../../src/api/dto/UserDTO";
import { BASE_TEST_DATA_SOURCE, PHONE_REGEX } from "../../constants";

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

describe("User Database Model", () => {
	it ("Should create an object instance", () => {
		const instanceDto: UserDTO = new UserDTO(
			faker.person.fullName(),
			faker.internet.email(),
			faker.helpers.fromRegExp(PHONE_REGEX),
			randomUUID()
		);
		const newInstance: User = new User(instanceDto);

		expect(newInstance).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				name: expect.any(String),
				email: expect.any(String),
				mobile: expect.any(String)
			})
		);
	});
});