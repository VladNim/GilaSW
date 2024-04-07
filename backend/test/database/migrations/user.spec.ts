import { DataSourceOptions, QueryRunner } from "typeorm";
import { SharedDataSource } from "../../../src/database/DataSource";
import { CreateUserTable1712427068673 } from "../../../src/database/migrations/1712427068673-CreateUserTable";
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

describe("User Table Migrations", () => {
	// Migrations up
	it ("Should create the table gs_user", async () => {
		const migration: CreateUserTable1712427068673 = new CreateUserTable1712427068673();

		await migration.up(queryRunner);

		const tableExists = await queryRunner.hasTable(TABLE_NAME.USER);

		expect(tableExists).toBe(true);
	});

	// Migrations down
	it ("Should drop the table gs_user", async () => {
		const migration: CreateUserTable1712427068673 = new CreateUserTable1712427068673();

		await migration.down(queryRunner);

		const tableExists = await queryRunner.hasTable(TABLE_NAME.USER);

		expect(tableExists).toBe(false);
	});
});