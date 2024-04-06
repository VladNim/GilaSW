import { bind } from "decko";
import { FindManyOptions, Repository } from "typeorm";

export abstract class AbstractRepository<T> {
	readonly repo: Repository<T>;

	constructor(repo: Repository<T>) {
		this.repo = repo;
	}

	@bind
	async find(filter?: FindManyOptions<T>) : Promise<T[]> {
		const results = await this.repo.find(filter);

		return results;
	}

}