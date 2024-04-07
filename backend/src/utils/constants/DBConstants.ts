export const PHONE_REGEX = {
	VALIDATOR: /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/g,
	STRING: "\([0-9]{3}\) [0-9]{3}-[0-9]{4}"
}

export enum TABLE_NAME {
	MESSAGE_CATEGORY = "message_category",
	NOTIFICATION_TYPE = "notification_type",
	USER = "gs_user",
	USER_MESSAGE_CATEGORY_MAP = "gs_user_message_category_map",
	USER_NOTIFICATION_TYPE_MAP = "gs_user_notification_type_map"
};