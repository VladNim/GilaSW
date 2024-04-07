import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "@Model/User";

export class UsersSeeder implements Seeder {
	public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
		const usersFactory = factoryManager.get(User);

		const users = await usersFactory.saveMany(20);
	}
}