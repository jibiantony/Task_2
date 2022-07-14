import {MigrationInterface, QueryRunner} from "typeorm";

export class updated3DepartmentTable1657710868769 implements MigrationInterface {
    name = 'updated3DepartmentTable1657710868769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
