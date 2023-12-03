import { MigrationInterface, QueryRunner } from "typeorm"

export class AddColumnImageToTemplate1701594237013 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            alter table templates add column "previewImage" text
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            alter table templates drop column "previewImage"
        `)
    }

}
