import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnDescriptionToTemplate1701598238584
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            alter table templates add column "description" text
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        alter table templates drop column "description"
    `);
  }
}
