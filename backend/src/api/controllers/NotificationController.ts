import { Request, Response } from "express";
import { bind } from "decko";
import { NotificationService } from "@Service/NotificationService";
import { isEmpty, isUUID } from "class-validator";
import { NotificationLog } from "@Model/NotificationLog";
import { NotificationLogDTOResponse } from "@DTO/NotificationLogDTO";

export class NotificationController {
	private readonly service: NotificationService = new NotificationService();

	@bind
	async send(req: Request, res: Response): Promise<(Response | void)> {
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

	@bind
	async logs(_: Request, res: Response): Promise<(Response | void)> {
		try {
			const notificationLogModels: NotificationLog[] = await this.service.getLogsWithData();
			const notificationLogs: NotificationLogDTOResponse[] = notificationLogModels.map(
				n => new NotificationLogDTOResponse(n)
			);

			return res.json({ notificationLogs });
		} catch (error) {
			res.status(500);
			return res.json({
				error: error.message
			});
		}
	}
}