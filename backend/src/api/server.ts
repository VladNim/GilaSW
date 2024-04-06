import express from "express";
import { registerRoutes } from "@MainRouter";

export class Server {
	private readonly _app: express.Application = express();

	constructor() {
		registerRoutes(this._app);
	}

	public get app(): express.Application {
		return this._app;
	}
}