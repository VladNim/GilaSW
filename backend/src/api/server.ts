import express from "express";
import cors from "cors";
import { registerRoutes } from "@MainRouter";

export class Server {
	private readonly _app: express.Application = express();

	constructor() {
		this._app.use(express.json({ limit: "200mb" }));
		this._app.use(cors({
			origin: "*",
			methods: ["GET", "POST"],
			allowedHeaders: "*"
		}));

		registerRoutes(this._app);
	}

	public get app(): express.Application {
		return this._app;
	}
}