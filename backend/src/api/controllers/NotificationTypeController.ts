import { NextFunction, Request, Response } from "express";
import { bind } from "decko";
import { NotificationTypeRepository } from "@Repository/NotificationTypeRepository";
import { NotificationType } from "@Model/NotificationType";

export class NotificationTypeController {
	private readonly notificationTypeRepo: NotificationTypeRepository = new NotificationTypeRepository();

	@bind
	async find(_: Request, res: Response, next: NextFunction): Promise<(Response | void)> {
		try {
			const notificationTypes: NotificationType[] = await this.notificationTypeRepo.find();

			return res.json(notificationTypes);
		} catch (error) {
			return next(error);
		}
	}
}