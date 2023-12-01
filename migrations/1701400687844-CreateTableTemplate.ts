import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTemplate1701400687844 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`
        create table if not exists templates (
            id serial,
            name text not null,
            location text not null,
            "createdAt" timestamp not null default NOW(),
            "updatedAt" timestamp not null default NOW(),
            "deletedAt" timestamp,
            context jsonb,
            primary key(id),
            unique (name)
        )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`
        drop table templates
      `);
  }
}
