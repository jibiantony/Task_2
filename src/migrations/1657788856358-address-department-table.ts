import {MigrationInterface, QueryRunner} from "typeorm";

export class addressDepartmentTable1657788856358 implements MigrationInterface {
    name = 'addressDepartmentTable1657788856358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employeeaddress" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" ADD "house" character varying`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" ADD "district" character varying`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" ADD "state" character varying`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" ADD "zipcode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employeeaddress" DROP COLUMN "zipcode"`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" DROP COLUMN "district"`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" DROP COLUMN "house"`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" ADD "address" character varying NOT NULL`);
    }

}
