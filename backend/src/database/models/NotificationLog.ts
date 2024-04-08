import { NotificationLogDTO } from "@DTO/NotificationLogDTO";
import { INotificationLog } from "@Interface/INotificationLog";
import { MessageCategory } from "@Model/MessageCategory";
import { NotificationType } from "@Model/NotificationType";
import { User } from "@Model/User";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";

@Entity("notification_log")
export class NotificationLog implements INotificationLog {
    constructor(notificationLogDto?: NotificationLogDTO) {
        this.userId = notificationLogDto?.userId;
		this.messageCategoryId = notificationLogDto?.messageCategoryId;
		this.notificationTypeId = notificationLogDto?.notificationTypeId;
		this.payload = notificationLogDto?.payload;
    }

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({
		name: "user_id",
		nullable: false
	})
    public userId: string;

	@Column({
		name: "message_category_id",
		nullable: false
	})
    public messageCategoryId: string;

	@Column({
		name: "notification_type_id",
		nullable: false
	})
    public notificationTypeId: string;

	@Column()
    public payload: string;

	
	@CreateDateColumn({
		name: "created_at"
	})
	public createdAt?: Date;

	@ManyToOne(() => User, (user) => user.notificationLogs)
	@JoinColumn([
		{
			name: "user_id",
			referencedColumnName: "id"
		}
	])
	public user?: User;

	@ManyToOne(() => MessageCategory, (messageCategory) => messageCategory.notificationLogs)
	@JoinColumn([
		{
			name: "message_category_id",
			referencedColumnName: "id"
		}
	])
	public messageCategory?: MessageCategory;

	@ManyToOne(() => NotificationType, (notificationType) => notificationType.notificationLogs)
	@JoinColumn([
		{
			name: "notification_type_id",
			referencedColumnName: "id"
		}
	])
	public notificationType?: NotificationType;

}
