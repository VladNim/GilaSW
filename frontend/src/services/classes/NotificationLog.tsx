import moment from "moment";

class NotificationLog {
	public userName: string;
	public messageCategory: string;
	public notificationType: string;
	public createdAt: string;
	public payload: string;

	constructor(apiObject: any) {
		this.userName = apiObject.userName;
		this.messageCategory = apiObject.messageCategory;
		this.notificationType = apiObject.notificationType;
		this.createdAt = moment(apiObject.createdAt).format("YYYY-MM-DD HH:mm:ss");
		this.payload = JSON.stringify(apiObject.payload);
	}
}

export default NotificationLog;