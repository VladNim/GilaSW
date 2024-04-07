import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { TABLE_NAME } from "@Constants/DBConstants";

export class CreateMessageCategoryTable1712355692895 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table: Table = new Table({
            name: TABLE_NAME.MESSAGE_CATEGORY,
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    default: "gen_random_uuid()",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                }
            ],
        });

        await queryRunner.createTable(table, true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TABLE_NAME.MESSAGE_CATEGORY);
    }

}
