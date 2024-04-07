import { NextFunction, Request, Response } from "express";
import { bind } from "decko";
import { MessageCategory } from "@Model/MessageCategory";
import { MessageCategoryService } from "@Service/MessageCategoryService";

export class MessageCategoryController {
	private readonly service: MessageCategoryService = new MessageCategoryService();

	@bind
	async find(_: Request, res: Response, next: NextFunction): Promise<(Response | void)> {
		try {
			const categories: MessageCategory[] = await this.service.findAll();

			return res.json(categories);
		} catch (error) {
			return next(error);
		}
	}
}