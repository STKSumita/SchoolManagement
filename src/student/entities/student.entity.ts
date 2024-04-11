import { School } from "src/school/entities/school.entity";
import { StudentSubjectMap } from "src/student-subject-map/entities/student-subject-map.entity";
import { Subject } from "src/subject/entities/subject.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'student'})
export class Student {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    code: string;

    @Column()
    name: string;

    @Column()
    grade: number;

    @Column({name: 'school_id',type:'uuid'})
    school_id: string;

    @ManyToOne(() => School, (school) => school.student)
    @JoinColumn({name:'school_id'})
    school: School;
    
    
    @OneToMany(() => StudentSubjectMap, (studentsubjectmap) => studentsubjectmap.student,{nullable:true})
    @JoinTable()
    studentSubjectMap: StudentSubjectMap[]
  
}
    

