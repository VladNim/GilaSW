import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { DataSourceOptions } from "typeorm";
import { UserNotificationTypeMapDTO } from "../../../src/api/dto/UserNotificationTypeDTO";
import { BASE_TEST_DATA_SOURCE } from "../../constants";
import { SharedDataSource } from "../../../src/database/DataSource";
import { UserDTO } from "../../../src/api/dto/UserDTO";
import { PHONE_REGEX } from "../../../src/utils/constants/DBConstants";
import { User } from "../../../src/database/models/User";
import { NotificationType } from "../../../src/database/models/NotificationType";

let userId;
let notificationType: NotificationType;

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

	notificationType = (await SharedDataSource.instance.manager.find(NotificationType, { take: 1 }))[0];
});

afterAll(async() => {
	await SharedDataSource.instance.dropDatabase();
	await SharedDataSource.instance.destroy();
});

describe("User Notification Type Map DTO", () => {
	it ("Should create an object instance", () => {

		const instanceDto: UserNotificationTypeMapDTO = new UserNotificationTypeMapDTO(userId, notificationType.id);

		expect(instanceDto).toEqual(
			expect.objectContaining({
				userId: expect.any(String),
				notificationTypeId: expect.any(String)
			})
		);
	});

	it ("Should fail creating the objects due to validations", () => {
		const mustFailByUserId = () => {
			new UserNotificationTypeMapDTO(faker.color.human(), notificationType.id);
		};
		const mustFailByNotificationTypeId = () => {
			new UserNotificationTypeMapDTO(userId, faker.color.human());
		};

		expect(mustFailByUserId).toThrow(Error);
		expect(mustFailByNotificationTypeId).toThrow(Error);
	});
});