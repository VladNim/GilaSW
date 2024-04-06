import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMessageCategoryTable1712355692895 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
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
        } catch (error) {
            console.log("Create category table error (migration up): ", { error });
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropTable("message_category");
        } catch (error) {
            console.log("Create category table error (migration down): ", { error });
        }
    }

}
