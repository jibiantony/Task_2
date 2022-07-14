import { Type } from "class-transformer";
import { IsDefined, IsEnum, IsNumber, IsString, ValidateNested } from "class-validator";
import { Roles } from "../entities/Employee";
import { EmployeeAddress } from "../entities/EmployeeAddress";
import { AddressDto } from "./AddressDto";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public departmentId: string;

    @IsString()
    public password: string;

    @IsEnum(Roles)
    public Role: Roles;

    @ValidateNested()
    @IsDefined()
    @Type(() => AddressDto)
    public address: AddressDto;

}