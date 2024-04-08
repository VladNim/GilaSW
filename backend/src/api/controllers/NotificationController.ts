import { NextFunction, Request, Response } from "express";
import { bind } from "decko";
import { NotificationService } from "@Service/NotificationService";
import { isEmpty, isUUID } from "class-validator";

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

			if (isEmpty(message)) {
				throw new Error("Field message can't be empty or null");
			}

			if (!isUUID(id)) {
				throw new Error("Path parameter id need to be a valid UUID");
			}

			await this.service.send(id, message);

			res.status(204);
			return res.end();
		} catch (error) {
			res.status(500);
			return res.json({
				error: error.message
			});
		}
	}
}