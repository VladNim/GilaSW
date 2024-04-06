import { DataSourceOptions } from "typeorm";

export const BASE_TEST_DATA_SOURCE: DataSourceOptions = {
	type: "postgres",
	port: Number(process.env.POSTGRES_DB_PORT),
	database: process.env.POSTGRES_DB,
	migrationsRun: true,
	logging: false
};

export const PHONE_REGEX = "\([1-9]{3}\) [1-9]{3}-[0-9]{4}";