import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";
import { TABLE_NAME } from "@Constants/DBConstants";

export class CreateUserMessageCategoryMapTable1712468642109 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table: Table = new Table({
            name: TABLE_NAME.USER_MESSAGE_CATEGORY_MAP,
            columns: [
                {
                    name: "user_id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "message_category_id",
                    type: "uuid",
                    isPrimary: true
                },
            ]
        });

        await queryRunner.createTable(table, true);

        await queryRunner.createIndex(
            TABLE_NAME.USER_MESSAGE_CATEGORY_MAP,
            new TableIndex({
                name: "IDX_GS_USER_MESSAGE_CATEGORY_MAP_USER_ID",
                columnNames: ["user_id"]
            })
        );

        await queryRunner.createIndex(
            TABLE_NAME.USER_MESSAGE_CATEGORY_MAP,
            new TableIndex({
                name: "IDX_GS_USER_MESSAGE_CATEGORY_MAP_MESSAGE_CATEGORY_ID",
                columnNames: ["message_category_id"]
            })
        );

        await queryRunner.createForeignKey(
            TABLE_NAME.USER_MESSAGE_CATEGORY_MAP,
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: TABLE_NAME.USER,
                onDelete: "CASCADE",
                name: "FK_GS_USER_MESSAGE_CATEGORY_MAP_USER_ID"
            })
        );

        await queryRunner.createForeignKey(
            TABLE_NAME.USER_MESSAGE_CATEGORY_MAP,
            new TableForeignKey({
                columnNames: ["message_category_id"],
                referencedColumnNames: ["id"],
                referencedTableName: TABLE_NAME.MESSAGE_CATEGORY,
                onDelete: "CASCADE",
                name: "FK_GS_USER_MESSAGE_CATEGORY_MAP_MESSAGE_CATEGORY_ID"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            TABLE_NAME.USER_MESSAGE_CATEGORY_MAP,
            "FK_GS_USER_MESSAGE_CATEGORY_MAP_USER_ID"
        );

        await queryRunner.dropForeignKey(
            TABLE_NAME.USER_MESSAGE_CATEGORY_MAP,
            "FK_GS_USER_MESSAGE_CATEGORY_MAP_MESSAGE_CATEGORY_ID"
        );

        await queryRunner.dropIndex(
            TABLE_NAME.USER_MESSAGE_CATEGORY_MAP,
            "IDX_GS_USER_MESSAGE_CATEGORY_MAP_USER_ID"
        );

        await queryRunner.dropIndex(
            TABLE_NAME.USER_MESSAGE_CATEGORY_MAP,
            "IDX_GS_USER_MESSAGE_CATEGORY_MAP_MESSAGE_CATEGORY_ID"
        );

        await queryRunner.dropTable(TABLE_NAME.USER_MESSAGE_CATEGORY_MAP);
    }

}
