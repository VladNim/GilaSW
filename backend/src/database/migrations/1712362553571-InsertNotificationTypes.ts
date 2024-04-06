import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertNotificationTypes1712362553571 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            const query = `
                INSERT INTO notification_type (type, id)
                VALUES
                    ('SMS', '76b1eccf-0129-43bb-b899-7c54eeffe1d3'),
                    ('E-Mail', '090f7cfd-cb6c-43cc-bc8f-5cb14dc22452'),
                    ('Push Notification', '5cf764e2-a58f-4361-a190-6148dbda38f2')
            `;

            await queryRunner.query(query);
        } catch (error) {
            console.log("Insert notification type error (migration up): ", { error });
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            const query = `
                DELETE FROM notification_type
                WHERE
                    id IN (
                        '76b1eccf-0129-43bb-b899-7c54eeffe1d3',
                        '090f7cfd-cb6c-43cc-bc8f-5cb14dc22452',
                        '5cf764e2-a58f-4361-a190-6148dbda38f2'
                    )
            `;
            await queryRunner.query(query);
        } catch (error) {
            console.log("Insert notification type error (migration down): ", { error });
        }
    }

}
