import { Router } from "express";
import { IRoute } from "@Interface/IRoute";
import { MessageCategoryController } from "@Controller/MessageCategoryController";

export class MessageCategoryRoutes implements IRoute<MessageCategoryController> {
	readonly controller: MessageCategoryController = new MessageCategoryController();
	readonly router: Router = Router();

	constructor() {
		this.init();
	}

	init(): void {
		this.router.get("/", this.controller.find);
	}
}