import { StudentSubjectMap } from "src/student-subject-map/entities/student-subject-map.entity";
import { Student } from "src/student/entities/student.entity";
import { Subject } from "src/subject/entities/subject.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'school'})
export class School {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true})
    name: string;

    @OneToMany(() => Subject, (subject) => subject.school)
    subject: Subject[];

    @OneToMany(() => Student, (student) => student.school)
    student: Student[];   
      
            
}           

