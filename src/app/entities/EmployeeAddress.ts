import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";
//import { Department } from "./Department";

@Entity("employeeaddress")
export class EmployeeAddress extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    // @Column({ nullable: false })
    // public Address: string;
    // @ManyToOne(() => Department, { cascade: true })
    // @JoinColumn()
    // public department: Department;

    // @Column({ nullable: false })
    // public Address: string;
    @Column({ nullable: true })
    public House: string;
    @Column({ nullable: true })
    public District: string;
    @Column({ nullable: true })
    public State: string;
    @Column({ nullable: true })
    public Zipcode: string;
}