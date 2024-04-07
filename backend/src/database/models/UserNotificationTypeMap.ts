import { UserNotificationTypeMapDTO } from "@DTO/UserNotificationTypeDTO";
import { IUserNotificationTypeMap } from "@Interface/IUserNotificationTypeMap";
import { Entity, Column } from "typeorm";

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

}
