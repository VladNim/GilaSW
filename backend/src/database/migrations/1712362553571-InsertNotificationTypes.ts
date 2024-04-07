import { MigrationInterface, QueryRunner } from "typeorm";
import { TABLE_NAME } from "@Constants/DBConstants";

export class InsertNotificationTypes1712362553571 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = `
            INSERT INTO ${TABLE_NAME.NOTIFICATION_TYPE} (type, id)
            VALUES
                ('SMS', '76b1eccf-0129-43bb-b899-7c54eeffe1d3'),
                ('E-Mail', '090f7cfd-cb6c-43cc-bc8f-5cb14dc22452'),
                ('Push Notification', '5cf764e2-a58f-4361-a190-6148dbda38f2')
        `;

        await queryRunner.query(query);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const query = `
            DELETE FROM ${TABLE_NAME.NOTIFICATION_TYPE}
            WHERE
                id IN (
                    '76b1eccf-0129-43bb-b899-7c54eeffe1d3',
                    '090f7cfd-cb6c-43cc-bc8f-5cb14dc22452',
                    '5cf764e2-a58f-4361-a190-6148dbda38f2'
                )
        `;
        await queryRunner.query(query);
    }

}
