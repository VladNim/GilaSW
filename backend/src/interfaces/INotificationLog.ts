export interface INotificationLog {
	id?: number;
	userId: string;
	messageCategoryId: string;
	notificationTypeId: string;
	payload: string;
	createdAt?: Date;
}