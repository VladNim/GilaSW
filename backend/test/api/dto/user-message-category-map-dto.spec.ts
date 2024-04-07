import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { DataSourceOptions } from "typeorm";
import { UserMessageCategoryMapDTO } from "../../../src/api/dto/UserMessageCategoryDTO";
import { BASE_TEST_DATA_SOURCE } from "../../constants";
import { SharedDataSource } from "../../../src/database/DataSource";
import { UserDTO } from "../../../src/api/dto/UserDTO";
import { PHONE_REGEX } from "../../../src/utils/constants/DBConstants";
import { User } from "../../../src/database/models/User";
import { MessageCategory } from "../../../src/database/models/MessageCategory";

let userId;
let messageCategory: MessageCategory;

beforeAll(async() => {
	const dataSource: DataSourceOptions = {
		...BASE_TEST_DATA_SOURCE,
		migrationsRun: true
	};

	await SharedDataSource.initialize(dataSource);

	userId = randomUUID();
	
	const userDto: UserDTO = new UserDTO(
		faker.person.fullName(),
		faker.internet.email(),
		faker.helpers.fromRegExp(PHONE_REGEX.STRING),
		userId
	);

	await SharedDataSource.instance.manager.save(
		new User(userDto)
	);

	messageCategory = (await SharedDataSource.instance.manager.find(MessageCategory, { take: 1 }))[0];
});

afterAll(async() => {
	await SharedDataSource.instance.dropDatabase();
	await SharedDataSource.instance.destroy();
});

describe("User Message Category Map DTO", () => {
	it ("Should create an object instance", () => {

		const instanceDto: UserMessageCategoryMapDTO = new UserMessageCategoryMapDTO(userId, messageCategory.id);

		expect(instanceDto).toEqual(
			expect.objectContaining({
				userId: expect.any(String),
				messageCategoryId: expect.any(String)
			})
		);
	});

	it ("Should fail creating the objects due to validations", () => {
		const mustFailByUserId = () => {
			new UserMessageCategoryMapDTO(faker.color.human(), messageCategory.id);
		};
		const mustFailByMessageCategoryId = () => {
			new UserMessageCategoryMapDTO(userId, faker.color.human());
		};

		expect(mustFailByUserId).toThrow(Error);
		expect(mustFailByMessageCategoryId).toThrow(Error);
	});
});