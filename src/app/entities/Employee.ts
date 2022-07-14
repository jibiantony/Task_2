import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstratctEntity";
import { Department } from "./Department";
import { EmployeeAddress } from "./EmployeeAddress";

export enum Roles {
    HR = "HR",
    Admin = "Admin",
    Engineer = "Engineer",
    Manager = "Manager"
};

@Entity("employee")
export class Employee extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false })
    public name: string;
    @ManyToOne(() => Department, { cascade: true })
    @JoinColumn()
    public department: Department;

    @Column({ nullable: false })
    public departmentId: string;

    @Column({nullable:true})
    public joiningdate: string;

    @Column({nullable:true})
    public Role: Roles;
    
    @Column({nullable:true})
    public status: string;

    @Column({nullable:true})
    public experience: string;


    @Column({nullable:true})
    public password: string;
    
    @OneToOne(()=> EmployeeAddress,{cascade:true})
    @JoinColumn()
    address: EmployeeAddress;
}