import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
import { SeederOptions, runSeeders } from "typeorm-extension";

dotenv.config();

const baseDataSourceOptions: DataSourceOptions & SeederOptions = {
	type: "postgres",
	host: process.env.PGHOST ?? process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_DB_PORT),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	synchronize: false,
	logging: true,
	entities: [`${__dirname}/models/**/*.*`],
	migrations: [`${__dirname}/migrations/**/*.*`],
	factories: [`${__dirname}/factories/**/*.{js,ts}`],
	seeds: [`${__dirname}/seeders/**/*.{js,ts}`],
	subscribers: [],
	migrationsRun: true,
	logNotifications: false
};

export class SharedDataSource {
	private static _instance: DataSource;

	private constructor() {}

	public static async initialize(dataSourceConfig?: DataSourceOptions): Promise<void> {
		try {
			const mustMockUsers = process.env.MOCK_USERS === "true";

			if (!SharedDataSource._instance || !SharedDataSource._instance.isInitialized) {
				if (dataSourceConfig) {
					Object.keys(dataSourceConfig).forEach(key => {
						baseDataSourceOptions[key] = dataSourceConfig[key];
					});
				}
				
				this._instance = new DataSource(baseDataSourceOptions);

				await this._instance.initialize();

				if (mustMockUsers) {
					const existingUsers = await this._instance.query("SELECT COUNT (*) FROM user");
					if (!existingUsers) await runSeeders(this._instance);
				}
			}
		} catch (error) {
			console.error("Error trying to open db connection: ", { message: error.message, error });
		}
	}

	public static get instance(): DataSource {
		return SharedDataSource._instance;
	}
}