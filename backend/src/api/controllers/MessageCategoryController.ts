import { NextFunction, Request, Response } from "express";
import { bind } from "decko";
import { MessageCategoryRepository } from "@Repository/MessageCategoryRepository";
import { MessageCategory } from "@Model/MessageCategory";

export class MessageCategoryController {
	private readonly categoryRepo: MessageCategoryRepository = new MessageCategoryRepository();

	@bind
	async find(_: Request, res: Response, next: NextFunction): Promise<(Response | void)> {
		try {
			const categories: MessageCategory[] = await this.categoryRepo.find();

			return res.json(categories);
		} catch (error) {
			return next(error);
		}
	}
}