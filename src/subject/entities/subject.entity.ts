import { School } from "src/school/entities/school.entity";
import { StudentSubjectMap } from "src/student-subject-map/entities/student-subject-map.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

@Entity({name: 'subject'})
export class Subject {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique:true})                 
    name: string;

    @Column()
    grade: number;

    @Column({name: 'school_id',type:'uuid'})
    school_id: string;

    @ManyToOne(() => School, (school) => school.subject)
    @JoinColumn({name:'school_id'})
    school: School; 

    @OneToMany(() => StudentSubjectMap, (studentsubjectmap) => studentsubjectmap.subject,{nullable:true})
    @JoinTable()
    studentsubjectmap: StudentSubjectMap[]
    
}
