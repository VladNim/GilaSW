import { DataSourceOptions, QueryRunner } from "typeorm";
import { SharedDataSource } from "../../../src/database/DataSource";

import { CreateUserTable1712427068673 } from "../../../src/database/migrations/1712427068673-CreateUserTable";
import { CreateMessageCategoryTable1712355692895 } from "../../../src/database/migrations/1712355692895-CreateMessageCategoryTable";

import { CreateUserMessageCategoryMapTable1712468642109 } from "../../../src/database/migrations/1712468642109-CreateUserMessageCategoryMapTable";
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

	const categoryMigration: CreateMessageCategoryTable1712355692895 = new CreateMessageCategoryTable1712355692895();
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
	it ("Should create the table gs_user_message_category_map", async () => {
		const migration: CreateUserMessageCategoryMapTable1712468642109 = new CreateUserMessageCategoryMapTable1712468642109();

		await migration.up(queryRunner);

		const tableExists = await queryRunner.hasTable("gs_user_message_category_map");
		
		expect(tableExists).toBe(true);
	});

	// Migrations down
	it ("Should drop the table gs_user_message_category_map", async () => {
		const migration: CreateUserMessageCategoryMapTable1712468642109 = new CreateUserMessageCategoryMapTable1712468642109();

		await migration.down(queryRunner);

		const tableExists = await queryRunner.hasTable("gs_user_message_category_map");

		expect(tableExists).toBe(false);
	});
});