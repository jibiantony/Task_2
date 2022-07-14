import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { AbstractEntity } from "./AbstratctEntity";
import { Employee } from "./Employee";

@Entity("department")
export class Department extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false })
    public department_name: string;
    
    @OneToMany(() => Employee, (employee) => employee.department)
    @JoinColumn()
    public employee: Employee[];
}
