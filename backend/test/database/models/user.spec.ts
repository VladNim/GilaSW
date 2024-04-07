import { DataSourceOptions } from "typeorm";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { SharedDataSource } from "../../../src/database/DataSource";
import { User } from "../../../src/database/models/User";
import { UserDTO } from "../../../src/api/dto/UserDTO";
import { BASE_TEST_DATA_SOURCE } from "../../constants";
import { PHONE_REGEX } from "../../../src/utils/constants/DBConstants";

beforeAll(async() => {
	const dataSource: DataSourceOptions = {
		...BASE_TEST_DATA_SOURCE,
		migrationsRun: true
	};

	process.env.MOCK_USERS = "true";

	await SharedDataSource.initialize(dataSource);
});

afterAll(async() => {
	await SharedDataSource.instance.dropDatabase();
	await SharedDataSource.instance.destroy();
});

describe("User Database Model", () => {
	it ("Should create an object instance", () => {
		const instanceDto: UserDTO = new UserDTO(
			faker.person.fullName(),
			faker.internet.email(),
			faker.helpers.fromRegExp(PHONE_REGEX.STRING),
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