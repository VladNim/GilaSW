import { DataSourceOptions } from "typeorm";
import request from "supertest";
import { SharedDataSource } from "../../src/database/DataSource";
import { Server } from "../../src/api/server";
import { BASE_TEST_DATA_SOURCE } from "../constants";

let server: Server;

beforeAll(async() => {
	const dataSource: DataSourceOptions = {
		...BASE_TEST_DATA_SOURCE,
		migrationsRun: false
	};

	await SharedDataSource.initialize(dataSource);
	server = new Server();
});

afterAll(async() => {
	await SharedDataSource.instance.destroy();
});

describe("Main Server & Router", () => {
	it ("Should create the server instance", () => {
		expect(server).not.toBeNull();
		expect(server).not.toBeUndefined();
	});

	it ("The server should contains at least one route (health checker)", () => {
		const routes = server.app._router.stack;
		expect(routes).not.toBeNull();
		expect(routes).not.toBeUndefined();
	});

	it ("The Health Checker should return 200 and Ok", done => {
		request(server.app)
			.get("/api")
			.expect("Content-Type", /html/)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);

				expect(res.text).toEqual("Ok");
				done();
			});
	});
});