import { In, MigrationInterface, QueryRunner } from "typeorm";

export class InsertMessageCategories1712357125739 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = `
            INSERT INTO message_category (name, id)
            VALUES
                ('Sports', 'a2c93b30-65b7-463c-94b3-88e75d00ce95'),
                ('Finance', 'c311ad7d-4a42-4bf6-947a-7a48bdd6bee3'),
                ('Movies', 'cddfa510-e205-4b7d-a630-11213b03d435')
        `;

        await queryRunner.query(query);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const query = `
            DELETE FROM message_category
            WHERE
                id IN (
                    'a2c93b30-65b7-463c-94b3-88e75d00ce95',
                    'c311ad7d-4a42-4bf6-947a-7a48bdd6bee3',
                    'cddfa510-e205-4b7d-a630-11213b03d435'
                )
        `;
        await queryRunner.query(query);
    }

}
