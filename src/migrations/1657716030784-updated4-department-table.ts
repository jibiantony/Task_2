import {MigrationInterface, QueryRunner} from "typeorm";

export class updated4DepartmentTable1657716030784 implements MigrationInterface {
    name = 'updated4DepartmentTable1657716030784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
    }

}
