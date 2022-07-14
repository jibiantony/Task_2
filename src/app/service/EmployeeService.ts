import { plainToClass } from "class-transformer";
import { ObjectLiteral } from "typeorm";
import { EmployeeRespository } from "../repository/EmployeeRepository";
//import {bcrypt} from "bcrpyt";
import { Employee } from "../entities/Employee";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

export class EmployeeService {
  constructor(private employeerepo: EmployeeRespository) { }
  async getAllEmployees() {
    return this.employeerepo.getAllEmployees();
  }
  // async createEmployee(createBody: ObjectLiteral)
  // {
  //     // const data: any = { message: "Created Employee"};
  //     // return data;
  //     return await this.employeerepo.createEmployee(createBody);
  // }
  public async createEmployee(employeeDetails: any) {
    try {
      const newEmployee = plainToClass(Employee, {
        name: employeeDetails.name,
        password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10) : '',
        departmentId: employeeDetails.departmentId,
        address: employeeDetails.address,
        Role: employeeDetails.Role
      });
      console.log(newEmployee)
      const save = await this.employeerepo.saveEmployeeDetails(newEmployee);
      return save;
    } catch (err) {
      //throw new HttpException(400, "Failed to create employee");'
      console.log(err);
    }
  }
  async updateEmployee(Id: string, updateBody: ObjectLiteral) {
    // const data: any = { message: "Created Employee"};
    // return data;
    console.log('id', Id);
    console.log('update body', updateBody);
    return await this.employeerepo.updateEmployee(Id, updateBody);
  }
  async getByid(Id: string) {
    // const data: any = { message: "Created Employee"};
    // return data;
    console.log('id', Id);
    return await this.employeerepo.getByid(Id);
  }
  async deleteEmployee(Id: string) {
    // const data: any = { message: "Created Employee"};
    // return data;
    console.log('id', Id);
    return await this.employeerepo.deleteEmployee(Id);
  }
  async getAddress(Id: string) {
    // const data: any = { message: "Created Employee"};
    // return data;
    console.log('id', Id);
    return await this.employeerepo.getAddress(Id);
  }
  public employeeLogin = async (
    name: string,
    password: string
  ) => {
    const employeeDetails = await this.employeerepo.getEmployeeByName(
      name

    );
    console.log(employeeDetails)
    if (!employeeDetails) {
      throw new UserNotAuthorizedException();
    }
    const validPassword = await bcrypt.compare(password, employeeDetails.password);
    console.log(validPassword)
    if (validPassword) {
      let payload = {
        "custom:id": employeeDetails.id,
        "custom:name": employeeDetails.name,
        "custom:Role": employeeDetails.Role
      };
      const token = this.generateAuthTokens(payload);

      return {
        idToken: token,
        employeeDetails,
      };
    } else {
      throw new IncorrectUsernameOrPasswordException();
    }

  };

  private generateAuthTokens = (payload: any) => {
    return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.ID_TOKEN_VALIDITY,
    });
  };
}
    //getAllEmployees(){
    //     const employeeResp = [
    //         {
    //             "id": "af168383-b350-4894-8ca3-34811ffa34ac",
    //             "name": "Rahul",
    //             "joiningDate": "2021-07-15T14:48:00.000Z",
    //             "role": "dev",
    //             "experience": 1,
    //             "status": "Active",
    //             "designation": 'Associate',
    //             "employeeProofUrl": "erer",
    //             "email": "test@test.com",
    //             "password": "123456",
    //             "departments": []
    //         },
    //         {
    //             "id": "763a5477-c283-4724-94ce-6dc7a5688685",
    //             "name": "hawari",
    //             "joiningDate": "2020-01-08T10:53:09.506Z",
    //             "role": "dev",
    //             "experience": 5,
    //             "status": "Active",
    //             "designation": "Senior",
    //             "employeeProofUrl": "http://",
    //             "email": "test@gmail.com",
    //             "password": "teereddf",
    //             "departments": [
    //                 {
    //                     "id": "b4fec1fd-5921-4c0e-883c-0904c4a70bad",
    //                     "name": "developers"
    //                 }
    //             ]
    //         }
    //     ]
    //     return employeeResp;
    // }
