import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMessageCategoryTable1712355692895 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table: Table = new Table({
            name: "message_category",
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
        await queryRunner.dropTable("message_category");
    }

}
