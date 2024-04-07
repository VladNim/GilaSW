import { DataSourceOptions, QueryRunner } from "typeorm";
import { SharedDataSource } from "../../../src/database/DataSource";
import { MessageCategory } from "../../../src/database/models/MessageCategory";
import { CreateMessageCategoryTable1712355692895 } from "../../../src/database/migrations/1712355692895-CreateMessageCategoryTable";
import { InsertMessageCategories1712357125739 } from "../../../src/database/migrations/1712357125739-InsertMessageCategories";
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
});

afterAll(async() => {
	await queryRunner.release();
	await SharedDataSource.instance.dropDatabase();
	await SharedDataSource.instance.destroy();
});

afterEach(() => {
	jest.resetAllMocks();
});

describe("Message Category Table Migrations", () => {
	// Migrations up
	it ("Should create the table message_category", async () => {
		const migration: CreateMessageCategoryTable1712355692895 = new CreateMessageCategoryTable1712355692895();

		await migration.up(queryRunner);

		const tableExists = await queryRunner.hasTable(TABLE_NAME.MESSAGE_CATEGORY);

		expect(tableExists).toBe(true);
	});

	it ("Should insert message categories, MessageCategory count must be greater than 0", async () => {
		const migration: InsertMessageCategories1712357125739 = new InsertMessageCategories1712357125739();
		const spyOnMigrationUp = jest.spyOn(migration, "up");

		await migration.up(queryRunner);
		const messageCategoriesCount = await queryRunner.manager.countBy(MessageCategory, {});

		expect(messageCategoriesCount).toBeGreaterThan(0);
		expect(spyOnMigrationUp).toHaveBeenCalledTimes(1);
	});

	// Migrations down
	it ("Should delete the message categories, MessageCategory count must be 0", async () => {
		const migration: InsertMessageCategories1712357125739 = new InsertMessageCategories1712357125739();
		const spyOnMigrationDown = jest.spyOn(migration, "down");

		await migration.down(queryRunner);
		const messageCategoriesCount = await queryRunner.manager.countBy(MessageCategory, {});

		expect(messageCategoriesCount).toBe(0);
		expect(spyOnMigrationDown).toHaveBeenCalledTimes(1);
	});

	it ("Should drop the table message_category", async () => {
		const migration: CreateMessageCategoryTable1712355692895 = new CreateMessageCategoryTable1712355692895();

		await migration.down(queryRunner);

		const tableExists = await queryRunner.hasTable(TABLE_NAME.MESSAGE_CATEGORY);

		expect(tableExists).toBe(false);
	});
});