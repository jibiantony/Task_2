import {MigrationInterface, QueryRunner} from "typeorm";

export class removeEmployeeAddress1657777117013 implements MigrationInterface {
    name = 'removeEmployeeAddress1657777117013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employeeaddress" DROP CONSTRAINT "FK_520b58f04b6b1572d10e76bb6f9"`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" DROP CONSTRAINT "REL_520b58f04b6b1572d10e76bb6f"`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" DROP COLUMN "employee_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employeeaddress" ADD "employee_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" ADD CONSTRAINT "REL_520b58f04b6b1572d10e76bb6f" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" ADD CONSTRAINT "FK_520b58f04b6b1572d10e76bb6f9" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
