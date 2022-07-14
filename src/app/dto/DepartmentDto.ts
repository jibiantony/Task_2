import { IsString } from "class-validator";

export class DepartmentDto {
    @IsString()
    name: string;
}