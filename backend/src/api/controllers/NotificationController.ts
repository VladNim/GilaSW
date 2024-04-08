import { NextFunction, Request, Response } from "express";
import { bind } from "decko";
import { NotificationService } from "@Service/NotificationService";

export class NotificationController {
	private readonly service: NotificationService = new NotificationService();

	@bind
	async send(req: Request, res: Response, next: NextFunction): Promise<(Response | void)> {
		try {
			const {
				params: {
					id
				},
				body: {
					message
				}
			} = req;

			await this.service.send(id, message);

			res.status(204);
			return res.end();
		} catch (error) {
			return next(error);
		}
	}
}