import { Router } from "express";
import { IRoute } from "@Interface/IRoute";
import { NotificationTypeController } from "@Controller/NotificationTypeController";

export class NotificationTypeRoutes implements IRoute<NotificationTypeController> {
	readonly controller: NotificationTypeController = new NotificationTypeController();
	readonly router: Router = Router();

	constructor() {
		this.init();
	}

	init(): void {
		this.router.get("/", this.controller.find);
	}
}