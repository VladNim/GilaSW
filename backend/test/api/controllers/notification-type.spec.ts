import { DataSourceOptions } from "typeorm";
import request from "supertest";
import { SharedDataSource } from "../../../src/database/DataSource";
import { Server } from "../../../src/api/server";
import { BASE_TEST_DATA_SOURCE } from "../../constants";

let server: Server;

beforeAll(async() => {
	const dataSource: DataSourceOptions = BASE_TEST_DATA_SOURCE;
	
	await SharedDataSource.initialize(dataSource);
	server = new Server();
});

afterAll(async() => {
	await SharedDataSource.instance.dropDatabase();
	await SharedDataSource.instance.destroy();
});

describe("Notification Type Controllers", () => {
	it ("Should return 200 and the existing notification types", done => {
		request(server.app)
			.get("/api/notification-types")
			.expect("Content-Type", /json/)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);

				expect(res.body).toBeTruthy();
				done();
			});
	});
});