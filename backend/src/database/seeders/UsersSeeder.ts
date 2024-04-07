import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "@Model/User";
import { MessageCategory } from "@Model/MessageCategory";
import { NotificationType } from "@Model/NotificationType";
import { UserMessageCategoryMapDTO } from "@DTO/UserMessageCategoryDTO";
import { UserNotificationTypeMapDTO } from "@DTO/UserNotificationTypeDTO";
import { getRandomLowerThan } from "@MathUtils";
import { UserNotificationTypeMap } from "@Model/UserNotificationTypeMap";
import { UserMessageCategoryMap } from "@Model/UserMessageCategoryMap";

export class UsersSeeder implements Seeder {
	public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<User[]> {
		const usersFactory = factoryManager.get(User);

		const users = await usersFactory.saveMany(20);
		const messageCategories: MessageCategory[] = await dataSource.manager.find(MessageCategory, {});
		const notificationTypes: NotificationType[] = await dataSource.manager.find(NotificationType, {});

		const messageCategoryIds = messageCategories.map(m => m.id);
		const notificationTypeIds = notificationTypes.map(n => n.id);
		const messageCategoriesLength = messageCategoryIds.length;
		const notificationTypesLength = notificationTypeIds.length;

		const userMessageCategoryMaps: UserMessageCategoryMap[] = [];
		const userNotificationTypeMaps: UserNotificationTypeMap[] = [];

		// Creates a random number of categories and notification types by user
		users.forEach(user => {
			const { id } = user;
			const randomMessageCategories: number = getRandomLowerThan(messageCategoriesLength);
			const randomNotificationTypes: number = getRandomLowerThan(notificationTypesLength);

			const usedMsgKeys = {};
			for (let index = 0; index < randomMessageCategories; index++) {
				const idxMsgCat: number = getRandomLowerThan(messageCategoriesLength);
				const msgCatId: string = messageCategoryIds[idxMsgCat];

				// Avoid duplicated keys
				if (usedMsgKeys[id + msgCatId]) continue;

				usedMsgKeys[id + msgCatId] = true;
				userMessageCategoryMaps.push(
					new UserMessageCategoryMap(
						new UserMessageCategoryMapDTO(id, msgCatId)
					)
				);
			}

			const usedNotiKeys = {};
			for (let index = 0; index < randomNotificationTypes; index++) {
				const idxNotifType: number = getRandomLowerThan(notificationTypesLength);
				const notifTypeId: string = notificationTypeIds[idxNotifType];

				// Avoid duplicated keys
				if (usedNotiKeys[id + notifTypeId]) continue;

				usedNotiKeys[id + notifTypeId] = true;
				userNotificationTypeMaps.push(
					new UserNotificationTypeMap(
						new UserNotificationTypeMapDTO(id, notifTypeId)
					)
				);
			}
		});

		await dataSource.manager.save(userMessageCategoryMaps);
		await dataSource.manager.save(userNotificationTypeMaps);

		return users;
	}
}