import {MigrationInterface, QueryRunner} from "typeorm";

export class editedEmloyTable1657790159632 implements MigrationInterface {
    name = 'editedEmloyTable1657790159632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "joiningdate" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "joiningdate"`);
    }

}
