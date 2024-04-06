import { Request, Response, Router } from "express";
import { MessageCategoryRoutes } from "@Route/MessageCategoryRouter";
import { NotificationTypeRoutes } from "@Route/NotificationTypeRouter";

export function registerRoutes(router: Router): void {
	const prefix = "/api";
	
	router.get(prefix, healthChecker);

	router.use(`${prefix}/message-categories`, new MessageCategoryRoutes().router);
	router.use(`${prefix}/notification-types`, new NotificationTypeRoutes().router);
}

function healthChecker(_: Request, res: Response) {
	res.send("Ok");
}