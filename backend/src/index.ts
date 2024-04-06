import "reflect-metadata";
import "module-alias/register";

import { config } from "dotenv";
config();

import express from "express";

import { SharedDataSource } from "@DataSource";
import { Server } from "@Server";

async function main() {
	try {
		await SharedDataSource.initialize();

		const port = process.env.PORT;
		const app: express.Application = new Server().app;

		app.listen(port);
		
		app.on("listening", () => {
			console.log(`Listening on port ${port}`);
		});

		app.on("close", () => {
			SharedDataSource.instance.destroy();
			console.log("Server closed");
		});
	} catch(error) {
		console.log("Error trying to start the server", { error });
	}
}

main();