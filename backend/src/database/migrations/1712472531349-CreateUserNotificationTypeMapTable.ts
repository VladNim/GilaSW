import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";
import { TABLE_NAME } from "@Constants/DBConstants";

export class CreateUserNotificationTypeMapTable1712472531349 implements MigrationInterface {
    private readonly TABLE_NAME = "gs_user_notification_type_map";

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table: Table = new Table({
            name: TABLE_NAME.USER_NOTIFICATION_TYPE_MAP,
            columns: [
                {
                    name: "user_id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "notification_type_id",
                    type: "uuid",
                    isPrimary: true
                }
            ]
        });

        await queryRunner.createTable(table, true);

        await queryRunner.createIndex(
            TABLE_NAME.USER_NOTIFICATION_TYPE_MAP,
            new TableIndex({
                name: "IDX_GS_USER_NOTIFICATION_TYPE_MAP_USER_ID",
                columnNames: ["user_id"]
            })
        );

        await queryRunner.createIndex(
            TABLE_NAME.USER_NOTIFICATION_TYPE_MAP,
            new TableIndex({
                name: "IDX_GS_USER_NOTIFICATION_TYPE_MAP_NOTIFICATION_TYPE_ID",
                columnNames: ["notification_type_id"]
            })
        );

        await queryRunner.createForeignKey(
            TABLE_NAME.USER_NOTIFICATION_TYPE_MAP,
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: TABLE_NAME.USER,
                onDelete: "CASCADE",
                name: "FK_GS_USER_NOTIFICATION_TYPE_MAP_USER_ID"
            })
        );

        await queryRunner.createForeignKey(
            TABLE_NAME.USER_NOTIFICATION_TYPE_MAP,
            new TableForeignKey({
                columnNames: ["notification_type_id"],
                referencedColumnNames: ["id"],
                referencedTableName: TABLE_NAME.NOTIFICATION_TYPE,
                onDelete: "CASCADE",
                name: "FK_GS_USER_NOTIFICATION_TYPE_MAP_NOTIFICATION_TYPE_ID"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            TABLE_NAME.USER_NOTIFICATION_TYPE_MAP,
            "FK_GS_USER_NOTIFICATION_TYPE_MAP_USER_ID"
        );

        await queryRunner.dropForeignKey(
            TABLE_NAME.USER_NOTIFICATION_TYPE_MAP,
            "FK_GS_USER_NOTIFICATION_TYPE_MAP_NOTIFICATION_TYPE_ID"
        );

        await queryRunner.dropIndex(
            TABLE_NAME.USER_NOTIFICATION_TYPE_MAP,
            "IDX_GS_USER_NOTIFICATION_TYPE_MAP_USER_ID"
        );

        await queryRunner.dropIndex(
            TABLE_NAME.USER_NOTIFICATION_TYPE_MAP,
            "IDX_GS_USER_NOTIFICATION_TYPE_MAP_NOTIFICATION_TYPE_ID"
        );

        await queryRunner.dropTable(TABLE_NAME.USER_NOTIFICATION_TYPE_MAP);
    }

}
