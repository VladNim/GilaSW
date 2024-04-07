import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "@Model/User";

export class UsersSeeder implements Seeder {
	public async run(_: DataSource, factoryManager: SeederFactoryManager): Promise<User[]> {
		const usersFactory = factoryManager.get(User);

		return await usersFactory.saveMany(20);
	}
}