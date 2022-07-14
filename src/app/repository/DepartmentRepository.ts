import { getConnection, ObjectLiteral } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRespository {
    async getAllDepartments() {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find();
    }
    async createDepartments(deptBody: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        const dept1 = await departmentRepo.create(deptBody);
        return dept1.save();
    }
    async updateDepartment(departmentId: string, deptBody: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        const dept = await departmentRepo.update({ id: departmentId }, { department_name: deptBody.department_name })
        return dept
    }
    async getDepartmentid(departmentId: string) {
        const departmentRepo = getConnection().getRepository(Department);
        const dept = await departmentRepo.find({ id: departmentId } )
        return dept
    }
    async deleteDepartment(departmentId: string) {
        const departmentRepo = getConnection().getRepository(Department);
        const dept = await departmentRepo.softDelete({ id: departmentId } )
        return dept
    }
    }

