import ApiService from "../ApiService";
import NotificationLog from "../classes/NotificationLog";

class NotificationService extends ApiService {
	private path: string = "/notification";

	public async getLogs () {
		const response = await this.get(`${this.path}/logs`);
		const {
			data: { 
				notificationLogs
			}
		} = response;

		const logs: NotificationLog[] = notificationLogs.map((log: any) => new NotificationLog(log));
		return logs;
	}

	public async sendNotifications (messageCategoryId: string, message: string): Promise<boolean> {
		const response = await this.post(`${this.path}/${messageCategoryId}/send`, {
			message
		});
		return response.status === 204;
	}
}

export default NotificationService;