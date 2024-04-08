import { TABLE_NAME } from "@Constants/DBConstants";
import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateNotificationLogTable1712552169382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table: Table = new Table({
            name: TABLE_NAME.NOTIFICATION_LOG,
            columns: [
                {
                    name: "id",
                    type: "serial",
                    isPrimary: true
                },
                {
                    name: "user_id",
                    type: "uuid",
                    isNullable: false
                },
                {
                    name: "message_category_id",
                    type: "uuid",
                    isNullable: false
                },
                {
                    name: "notification_type_id",
                    type: "uuid",
                    isNullable: false
                },
                {
                    name: "payload",
                    type: "json",
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        });

        await queryRunner.createTable(table, true);

        await queryRunner.createIndex(
            TABLE_NAME.NOTIFICATION_LOG,
            new TableIndex({
                name: "IDX_NOTIFICATION_LOG_CREATED_AT",
                columnNames: ["created_at"]
            })
        );

        await queryRunner.createForeignKey(
            TABLE_NAME.NOTIFICATION_LOG,
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: TABLE_NAME.USER,
                onDelete: "CASCADE",
                name: "FK_NOTIFICATION_LOG_USER_ID"
            })
        );

        await queryRunner.createForeignKey(
            TABLE_NAME.NOTIFICATION_LOG,
            new TableForeignKey({
                columnNames: ["message_category_id"],
                referencedColumnNames: ["id"],
                referencedTableName: TABLE_NAME.MESSAGE_CATEGORY,
                onDelete: "CASCADE",
                name: "FK_NOTIFICATION_LOG_MESSAGE_CATEGORY_ID"
            })
        );

        await queryRunner.createForeignKey(
            TABLE_NAME.NOTIFICATION_LOG,
            new TableForeignKey({
                columnNames: ["notification_type_id"],
                referencedColumnNames: ["id"],
                referencedTableName: TABLE_NAME.NOTIFICATION_TYPE,
                onDelete: "CASCADE",
                name: "FK_NOTIFICATION_LOG_NOTIFICATION_TYPE_ID"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            TABLE_NAME.NOTIFICATION_LOG,
            "FK_NOTIFICATION_LOG_NOTIFICATION_TYPE_ID"
        );

        await queryRunner.dropForeignKey(
            TABLE_NAME.NOTIFICATION_LOG,
            "FK_NOTIFICATION_LOG_MESSAGE_CATEGORY_ID"
        );

        await queryRunner.dropForeignKey(
            TABLE_NAME.NOTIFICATION_LOG,
            "FK_NOTIFICATION_LOG_USER_ID"
        );

        await queryRunner.dropIndex(
            TABLE_NAME.NOTIFICATION_LOG,
            "IDX_NOTIFICATION_LOG_CREATED_AT"
        );

        await queryRunner.dropTable(TABLE_NAME.NOTIFICATION_LOG);
    }

}
