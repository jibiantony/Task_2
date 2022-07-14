import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import { DeleteDateColumn } from "typeorm";
import authorize from "../middleware/authorize";
import { Roles } from "../entities/Employee";


class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/Employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, authorize(), this.getAllEmployees);
    this.router.post(`${this.path}`, authorize([Roles.HR, Roles.Admin]), validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body), this.createEmployee);
    this.router.get(`${this.path}/:id/address`, authorize(),this.getAddress);
    this.router.put(`${this.path}/:id`, authorize([Roles.HR, Roles.Admin]), this.updateEmployee);
    this.router.get(`${this.path}/:id`, authorize(), this.getByid);
    this.router.delete(`${this.path}/:id`, authorize([Roles.HR, Roles.Admin]), this.deleteEmployee);
    this.router.post(
      `${this.path}/login`,
      this.login

    );

  }
  private getAllEmployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      //const data: any = { message: "Employee Controller"};
      response.status(200);
      //response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
      response.send(await this.employeeService.getAllEmployees());
    } catch (error) {
      return next(error);
    }
  }
  private createEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      console.log(request.body)
      const data = await this.employeeService.createEmployee(request.body);
      //response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
      response.send(data);
    } catch (error) {
      return next(error);
    }
  }
  private updateEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      console.log('loging');
      response.status(200);
      response.send(await this.employeeService.updateEmployee(request.params.id, request.body));
    }
    catch (error) {
      return next(error);
    }
  }
  private getByid = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      response.send(await this.employeeService.getByid(request.params.id));
    }
    catch (error) {
      return next(error);
    }
  }
  private deleteEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      const data = await this.employeeService.deleteEmployee(request.params.id);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
    }
    catch (error) {
      console.log(error);
      return next(error);
    }
  }
  private getAddress= async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      //console.log('loging');
      response.status(200);
      response.send(await this.employeeService.getAddress(request.params.id));
    }
    catch (error) {
      console.log(error)
      return next(error);
    }
  }
  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const loginData = request.body;
    console.log(loginData)

    const loginDetail = await this.employeeService.employeeLogin(
      request.body.name,
      request.body.password

    );
    //console.log(request.body.name);
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
  };

}
export default EmployeeController;
