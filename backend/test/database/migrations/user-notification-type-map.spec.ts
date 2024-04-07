import { DataSourceOptions, QueryRunner } from "typeorm";
import { SharedDataSource } from "../../../src/database/DataSource";

import { CreateUserTable1712427068673 } from "../../../src/database/migrations/1712427068673-CreateUserTable";
import { CreateNotificationTypeTable1712361827102 } from "../../../src/database/migrations/1712361827102-CreateNotificationTypeTable";

import { CreateUserNotificationTypeMapTable1712472531349 } from "../../../src/database/migrations/1712472531349-CreateUserNotificationTypeMapTable";
import { BASE_TEST_DATA_SOURCE } from "../../constants";

let queryRunner: QueryRunner;

beforeAll(async() => {
	const dataSource: DataSourceOptions = {
		...BASE_TEST_DATA_SOURCE,
		migrationsRun: false
	};

	await SharedDataSource.initialize(dataSource);
	queryRunner = SharedDataSource.instance.createQueryRunner();

	const userMigration: CreateUserTable1712427068673 = new CreateUserTable1712427068673();
	await userMigration.up(queryRunner);

	const categoryMigration: CreateNotificationTypeTable1712361827102 = new CreateNotificationTypeTable1712361827102();
	await categoryMigration.up(queryRunner);
});

afterAll(async() => {
	await queryRunner.release();
	await SharedDataSource.instance.dropDatabase();
	await SharedDataSource.instance.destroy();
});

afterEach(() => {
	jest.resetAllMocks();
});

describe("User Message Category Map Table Migrations", () => {
	// Migrations up
	it ("Should create the table gs_user_notification_type_map", async () => {
		const migration: CreateUserNotificationTypeMapTable1712472531349 = new CreateUserNotificationTypeMapTable1712472531349();

		await migration.up(queryRunner);

		const tableExists = await queryRunner.hasTable("gs_user_notification_type_map");
		
		expect(tableExists).toBe(true);
	});

	// Migrations down
	it ("Should drop the table gs_user_notification_type_map", async () => {
		const migration: CreateUserNotificationTypeMapTable1712472531349 = new CreateUserNotificationTypeMapTable1712472531349();

		await migration.down(queryRunner);

		const tableExists = await queryRunner.hasTable("gs_user_notification_type_map");

		expect(tableExists).toBe(false);
	});
});