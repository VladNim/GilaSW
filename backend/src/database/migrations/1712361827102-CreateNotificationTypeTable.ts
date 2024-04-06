import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNotificationTypeTable1712361827102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table: Table = new Table({
            name: "notification_type",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    default: "gen_random_uuid()",
                    isPrimary: true
                },
                {
                    name: "type",
                    type: "varchar",
                    isNullable: false
                }
            ],
        });

        await queryRunner.createTable(table, true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("notification_type");
    }

}
