import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { TABLE_NAME } from "@Constants/DBConstants";

export class CreateUserTable1712427068673 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table: Table = new Table({
            name: TABLE_NAME.USER,
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
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "mobile",
                    type: "varchar",
                    isNullable: false
                }
            ],
        });

        await queryRunner.createTable(table, true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TABLE_NAME.USER);
    }

}
