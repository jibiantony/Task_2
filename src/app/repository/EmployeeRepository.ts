import { Console } from "console";
import { getConnection, ObjectLiteral } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository {
    async getAllEmployees() {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({ relations: ["department", "address"], });
    }
    async createEmployee(empBody: ObjectLiteral) {
        const employeeRepo = getConnection().getRepository(Employee);
        const emp = await employeeRepo.create(empBody);
        return emp.save();
    }
    async updateEmployee(Id: string, empBody: ObjectLiteral) {
        const employeeRepo = getConnection().getRepository(Employee);
        const emp = await employeeRepo.update({ id: Id }, { name: empBody.name });
        return emp;
    }
    async getByid(Id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const emp = await employeeRepo.find({ id: Id });
        return emp;
    }
    async getAddress(Id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const emp = await employeeRepo.findOne({ id: Id }, {relations:["address"]});
        return emp.address;
    }
    async deleteEmployee(Id: string) {
        console.log('delete', Id)
        const employeeRepo = getConnection().getRepository(Employee);
        const emp = await employeeRepo.softDelete({ id: Id });
        return emp;
    }
    public async getEmployeeByName(username: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name: username },
        });
        return employeeDetail;
    }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }
}