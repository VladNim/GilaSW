import { Request, Response, Router } from "express";
import { MessageCategoryRoutes } from "@Route/MessageCategoryRouter";
import { NotificationTypeRoutes } from "@Route/NotificationTypeRouter";
import { NotificationRoutes } from "@Route/NotificationRouter";

export function registerRoutes(router: Router): void {
	const prefix = "/api";
	
	router.get(prefix, healthChecker);

	router.use(`${prefix}/message-categories`, new MessageCategoryRoutes().router);
	router.use(`${prefix}/notification-types`, new NotificationTypeRoutes().router);

	router.use(`${prefix}/notification`, new NotificationRoutes().router);
}

function healthChecker(_: Request, res: Response) {
	res.send("Ok");
}