import { NextFunction, Request, Response } from "express";
import { bind } from "decko";
import { NotificationType } from "@Model/NotificationType";
import { NotificationTypeService } from "@Service/NotificationTypeService";

export class NotificationTypeController {
	private readonly service: NotificationTypeService = new NotificationTypeService();

	@bind
	async find(_: Request, res: Response, next: NextFunction): Promise<(Response | void)> {
		try {
			const notificationTypes: NotificationType[] = await this.service.findAll();

			return res.json(notificationTypes);
		} catch (error) {
			return next(error);
		}
	}
}