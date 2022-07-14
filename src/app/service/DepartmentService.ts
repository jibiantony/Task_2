import { plainToClass } from "class-transformer";
import { DepartmentDto } from "../dto/DepartmentDto";
import { Department } from "../entities/Department";
import { DepartmentRespository } from "../repository/DepartmentRepository";

export class DepartmentService {
    //     getAllDepartment(){
    //         const employeeResp = [
    //             {
    //                 "id": "af168383-b350-4894-8ca3-34811ffa34ac",
    //                 "name": "Rahul",
    //                 "joiningDate": "2021-07-15T14:48:00.000Z",
    //                 "role": "dev",
    //                 "experience": 1,
    //                 "status": "Active",
    //                 "designation": 'Associate',
    //                 "employeeProofUrl": "erer",
    //                 "email": "test@test.com",
    //                 "password": "123456",
    //                 "departments": []
    //             },
    //             {
    //                 "id": "763a5477-c283-4724-94ce-6dc7a5688685",
    //                 "name": "hawari",
    //                 "joiningDate": "2020-01-08T10:53:09.506Z",
    //                 "role": "dev",
    //                 "experience": 5,
    //                 "status": "Active",
    //                 "designation": "Senior",
    //                 "employeeProofUrl": "http://",
    //                 "email": "test@gmail.com",
    //                 "password": "teereddf",
    //                 "departments": [
    //                     {
    //                         "id": "b4fec1fd-5921-4c0e-883c-0904c4a70bad",
    //                         "name": "developers"
    //                     }
    //                 ]
    //             }
    //         ]
    //         return employeeResp;
    //     }
    //     }



    constructor(private departmentrepo: DepartmentRespository) { }
    async getAllDepartment() {
        return this.departmentrepo.getAllDepartments();
    }
    async createDepartment(departmentData: DepartmentDto) {
        // const data: any = { message: "Created Employee"};
        // return data;
        const department = plainToClass(Department, {
            department_name: departmentData.name
        });
        return await this.departmentrepo.createDepartments(department);
    }
    async updateDepartment(id: string, departmentData: DepartmentDto) {
        // const data: any = { message: "Created Employee"};
        //return data;
        const departmentdata = plainToClass(Department, {
            department_name: departmentData.name
        })

        return await this.departmentrepo.updateDepartment(id, departmentdata);
    }
    async getDepartmentid(id: string) {
        // const data: any = { message: "Created Employee"};
        //return data

        return await this.departmentrepo.getDepartmentid(id);
    }
    async deleteDepartment(id: string) {
        // const data: any = { message: "Created Employee"};
        //return data

        return await this.departmentrepo.deleteDepartment(id);
    }
}