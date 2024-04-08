import { UserNotificationTypeMapDTO } from "@DTO/UserNotificationTypeDTO";
import { IUserNotificationTypeMap } from "@Interface/IUserNotificationTypeMap";
import { NotificationType } from "@Model/NotificationType";
import { User } from "@Model/User";
import { Entity, Column, OneToOne, JoinTable } from "typeorm";

@Entity("gs_user_notification_type_map")
export class UserNotificationTypeMap implements IUserNotificationTypeMap {
    constructor(notificationTypeDto?: UserNotificationTypeMapDTO) {
        this.userId = notificationTypeDto?.userId;
        this.notificationTypeId = notificationTypeDto?.notificationTypeId;
    }

    @Column({
		name: "user_id",
		primary: true,
		nullable: false
	})
    public userId: string;

    @Column({
		name: "notification_type_id",
		primary: true,
		nullable: false
	})
    public notificationTypeId: string;

	@OneToOne(() => User)
	@JoinTable()
	user?: User;

	@OneToOne(() => NotificationType)
	@JoinTable()
	notificationType?: NotificationType;

}
