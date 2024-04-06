import { DataSourceOptions, QueryRunner } from "typeorm";
import { SharedDataSource } from "../../../src/database/DataSource";
import { NotificationType } from "../../../src/database/models/NotificationType";
import { CreateNotificationTypeTable1712361827102 } from "../../../src/database/migrations/1712361827102-CreateNotificationTypeTable";
import { InsertNotificationTypes1712362553571 } from "../../../src/database/migrations/1712362553571-InsertNotificationTypes";
import { BASE_TEST_DATA_SOURCE } from "../../constants";

let queryRunner: QueryRunner;

beforeAll(async() => {
	const dataSource: DataSourceOptions = {
		...BASE_TEST_DATA_SOURCE,
		migrationsRun: false
	};

	await SharedDataSource.initialize(dataSource);
	queryRunner = SharedDataSource.instance.createQueryRunner();
});

afterAll(async() => {
	await queryRunner.release();
	await SharedDataSource.instance.dropDatabase();
	await SharedDataSource.instance.destroy();
});

afterEach(() => {
	jest.resetAllMocks();
});

describe("Notification Type Table Migrations", () => {
	// Migrations up
	it ("Should create the table notification_type", async () => {
		const migration: CreateNotificationTypeTable1712361827102 = new CreateNotificationTypeTable1712361827102();

		await migration.up(queryRunner);

		const tableExists = await queryRunner.hasTable("notification_type");

		expect(tableExists).toBe(true);
	});

	it ("Should insert notification types, NotificationType count must be greater than 0", async () => {
		const migration: InsertNotificationTypes1712362553571 = new InsertNotificationTypes1712362553571();
		const spyOnMigrationUp = jest.spyOn(migration, "up");

		await migration.up(queryRunner);
		const messageCategoriesCount = await queryRunner.manager.countBy(NotificationType, {});

		expect(messageCategoriesCount).toBeGreaterThan(0);
		expect(spyOnMigrationUp).toHaveBeenCalledTimes(1);
	});

	// Migrations down
	it ("Should delete the notification types, NotificationType count must be 0", async () => {
		const migration: InsertNotificationTypes1712362553571 = new InsertNotificationTypes1712362553571();
		const spyOnMigrationDown = jest.spyOn(migration, "down");

		await migration.down(queryRunner);
		const messageCategoriesCount = await queryRunner.manager.countBy(NotificationType, {});

		expect(messageCategoriesCount).toBe(0);
		expect(spyOnMigrationDown).toHaveBeenCalledTimes(1);
	});

	it ("Should drop the table notification_type", async () => {
		const migration: CreateNotificationTypeTable1712361827102 = new CreateNotificationTypeTable1712361827102();

		await migration.down(queryRunner);

		const tableExists = await queryRunner.hasTable("notification_type");

		expect(tableExists).toBe(false);
	});
});