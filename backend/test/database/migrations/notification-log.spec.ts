import { DataSourceOptions, QueryRunner } from "typeorm";
import { SharedDataSource } from "../../../src/database/DataSource";

import { CreateUserTable1712427068673 } from "../../../src/database/migrations/1712427068673-CreateUserTable";
import { CreateMessageCategoryTable1712355692895 } from "../../../src/database/migrations/1712355692895-CreateMessageCategoryTable";
import { CreateNotificationTypeTable1712361827102 } from "../../../src/database/migrations/1712361827102-CreateNotificationTypeTable";
import { CreateNotificationLogTable1712552169382 } from "../../../src/database/migrations/1712552169382-CreateNotificationLogTable";

import { BASE_TEST_DATA_SOURCE } from "../../constants";
import { TABLE_NAME } from "../../../src/utils/constants/DBConstants";

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

	const categoryMigration: CreateMessageCategoryTable1712355692895 = new CreateMessageCategoryTable1712355692895();
	await categoryMigration.up(queryRunner);

	const notificationTypeMigration: CreateNotificationTypeTable1712361827102 = new CreateNotificationTypeTable1712361827102();
	await notificationTypeMigration.up(queryRunner);
});

afterAll(async() => {
	await queryRunner.release();
	await SharedDataSource.instance.dropDatabase();
	await SharedDataSource.instance.destroy();
});

afterEach(() => {
	jest.resetAllMocks();
});

describe("Notification Logs Table Migrations", () => {
	// Migrations up
	it ("Should create the table notification_log", async () => {
		const migration: CreateNotificationLogTable1712552169382 = new CreateNotificationLogTable1712552169382();

		await migration.up(queryRunner);

		const tableExists = await queryRunner.hasTable(TABLE_NAME.NOTIFICATION_LOG);
		
		expect(tableExists).toBe(true);
	});

	// Migrations down
	it ("Should drop the table notification_log", async () => {
		const migration: CreateNotificationLogTable1712552169382 = new CreateNotificationLogTable1712552169382();

		await migration.down(queryRunner);

		const tableExists = await queryRunner.hasTable(TABLE_NAME.NOTIFICATION_LOG);

		expect(tableExists).toBe(false);
	});
});