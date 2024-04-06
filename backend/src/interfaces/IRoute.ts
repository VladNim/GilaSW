import { Router } from "express";

export interface IRoute<T> {
	readonly controller: T;
	readonly router: Router;

	init(): void;
}