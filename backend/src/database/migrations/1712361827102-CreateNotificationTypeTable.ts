import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNotificationTypeTable1712361827102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
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
        } catch (error) {
            console.log("Create notification type table error (migration up): ", { error });
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropTable("notification_type");
        } catch (error) {
            console.log("Create notification type table error (migration down): ", { error });
        }
    }

}
