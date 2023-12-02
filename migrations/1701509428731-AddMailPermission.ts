import { MigrationInterface, QueryRunner } from "typeorm"

export class AddMailPermission1701509428731 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            insert into permissions (id, "createdAt", "updatedAt", name, description, policy, resource, upstream, method)
            values (default, default, default, 'Create mail template', 'Allow create template', 'template:create', '/templates', 'Mail', 'POST')
        `)
        await queryRunner.query(`
            insert into permissions (id, "createdAt", "updatedAt", name, description, policy, resource, upstream, method)
            values (default, default, default, 'Get mail template', 'Allow get template', 'template:get', '/templates', 'Mail', 'GET')
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            delete from permission 
            where policy in ('template:create', 'template:get')
        `)
    }

}
