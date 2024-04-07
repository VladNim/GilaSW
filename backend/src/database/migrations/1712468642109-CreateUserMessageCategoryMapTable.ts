import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateUserMessageCategoryMapTable1712468642109 implements MigrationInterface {
    private readonly TABLE_NAME = "gs_user_message_category_map";

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table: Table = new Table({
            name: this.TABLE_NAME,
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
            this.TABLE_NAME,
            new TableIndex({
                name: "IDX_GS_USER_MESSAGE_CATEGORY_MAP_USER_ID",
                columnNames: ["user_id"]
            })
        );

        await queryRunner.createIndex(
            this.TABLE_NAME,
            new TableIndex({
                name: "IDX_GS_USER_MESSAGE_CATEGORY_MAP_MESSAGE_CATEGORY_ID",
                columnNames: ["message_category_id"]
            })
        );

        await queryRunner.createForeignKey(
            this.TABLE_NAME,
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "gs_user",
                onDelete: "CASCADE",
                name: "FK_GS_USER_MESSAGE_CATEGORY_MAP_USER_ID"
            })
        );

        await queryRunner.createForeignKey(
            this.TABLE_NAME,
            new TableForeignKey({
                columnNames: ["message_category_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "message_category",
                onDelete: "CASCADE",
                name: "FK_GS_USER_MESSAGE_CATEGORY_MAP_MESSAGE_CATEGORY_ID"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            this.TABLE_NAME,
            "FK_GS_USER_MESSAGE_CATEGORY_MAP_USER_ID"
        );

        await queryRunner.dropForeignKey(
            this.TABLE_NAME,
            "FK_GS_USER_MESSAGE_CATEGORY_MAP_MESSAGE_CATEGORY_ID"
        );

        await queryRunner.dropIndex(
            this.TABLE_NAME,
            "IDX_GS_USER_MESSAGE_CATEGORY_MAP_USER_ID"
        );

        await queryRunner.dropIndex(
            this.TABLE_NAME,
            "IDX_GS_USER_MESSAGE_CATEGORY_MAP_MESSAGE_CATEGORY_ID"
        );

        await queryRunner.dropTable(this.TABLE_NAME);
    }

}
