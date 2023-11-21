import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableMail1700555976577 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table if not exists mails (
            id serial,
            "to" text not null,
            subject text not null,
            html text not null,
            "createdAt" timestamp not null default NOW(),
            "updatedAt" timestamp not null default NOW(),
            "deletedAt" timestamp, 
            primary key(id)
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('mails');
  }
}
