import { Router } from "express";
import { IRoute } from "@Interface/IRoute";
import { NotificationController } from "@Controller/NotificationController";

export class NotificationRoutes implements IRoute<NotificationController> {
	readonly controller: NotificationController = new NotificationController();
	readonly router: Router = Router();

	constructor() {
		this.init();
	}

	init(): void {
		this.router.post("/:id/send", this.controller.send);
	}
}