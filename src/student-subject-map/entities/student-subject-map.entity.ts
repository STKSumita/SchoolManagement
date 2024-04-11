import { Student } from "src/student/entities/student.entity";
import { Subject } from "src/subject/entities/subject.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'studentsubjectmap'})
export class StudentSubjectMap {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    score: number;

    @Column({name: 'subject_id',type:'uuid'})
    subject_id: string;

    @Column({name: 'student_id',type:'uuid'})
    student_id: string;

 
    @ManyToOne(() => Subject, (subject) => subject.studentsubjectmap,{nullable:false})
    @JoinColumn({name:'subject_id', referencedColumnName: 'id'})
    subject: Subject;

    @ManyToOne(() => Student, (student) => student.studentSubjectMap,{nullable:false})
    @JoinColumn({name: 'student_id', referencedColumnName: 'id'})
    student: Student;
}
