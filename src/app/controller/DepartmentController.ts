import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import { DepartmentService } from "../service/DepartmentService";
import { DepartmentDto } from "../dto/DepartmentDto";
import validationMiddleware from "../middleware/validationMiddleware";

class DepartmentController extends AbstractController {
    constructor(private departmentService: DepartmentService) {
        super(`${APP_CONSTANTS.apiPrefix}/Department`);
        this.initializeRoutes();
    }
    protected initializeRoutes() {
        this.router.get(`${this.path}`, this.getAlldepartment);
        this.router.post(`${this.path}`, validationMiddleware(DepartmentDto, APP_CONSTANTS.body), this.createDepartment);
        this.router.put(`${this.path}/:id`, validationMiddleware(DepartmentDto, APP_CONSTANTS.body), this.updateDepartment);
        this.router.get(`${this.path}/:id`, this.getDepartmentid);
        this.router.delete(`${this.path}/:id`,this.deleteDepartment)
    }
    private getAlldepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {
            //const data: any = { message: "Employee Controller"};
            response.status(200);
            //response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
            response.send(await this.departmentService.getAllDepartment());
        } catch (error) {
            return next(error);
        }
    }
    private createDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {
            //const data: any = { message: "Employee Controller"};
            response.status(200);
            //response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
            response.send(await this.departmentService.createDepartment(request.body));
        } catch (error) {
            return next(error);
        }
    }
    private updateDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {
            //const data: any = { message: "Employee Controller"};
            response.status(200);
            //response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
            response.send(await this.departmentService.updateDepartment(request.params.id, request.body));
        } catch (error) {
            return next(error);
        }
    }
    private getDepartmentid = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {
            //const data: any = { message: "Employee Controller"};
            response.status(200);
            //response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
            response.send(await this.departmentService.getDepartmentid(request.params.id));
        } catch (error) {
            return next(error);
        }
    }
    private deleteDepartment= async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {
            //const data: any = { message: "Employee Controller"};
            response.status(200);
            //response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
            const data= response.send(await this.departmentService.deleteDepartment(request.params.id));
            response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
        } catch (error) {
            return next(error);
        }
    }


}

export default DepartmentController;
