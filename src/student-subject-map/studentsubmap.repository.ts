import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { StudentSubjectMap } from './entities/student-subject-map.entity';
import { School } from 'src/school/entities/school.entity';


@Injectable()
export class studentsubjectmapRepository extends Repository<StudentSubjectMap> {
  constructor(private _dataSource: DataSource) {
    super(StudentSubjectMap, _dataSource.createEntityManager());
  }
  async enrollsubject(student: Student, subject: Subject) {
    const studentsubmap = await this.save({
      student: student,
      subject: subject,
      score: 0,
    });
    return studentsubmap;
  }

  async removeBysubject(subject: Subject) {
    const subjectssm = await this.createQueryBuilder('studentsubjectmap').innerJoin(
      'studentsubjectmap.subject',
      'subject',
      'subject.id= :subject_id',
      {
        subject_id: subject.id
      },
    ).getMany();
    return await this.remove(subjectssm);
  }

  async removeBystudent(student: Student) {
    const studentssm = await this.createQueryBuilder('studentsubjectmap').innerJoin(
      'studentsubjectmap.student',
      'student',
      'student.id= :student_id',
      {
        student_id: student.id
      },
    ).getMany();
    return await this.remove(studentssm);
  }

  // async removeBySchoolmap(school: School) {
  //   const studentssm = await this.createQueryBuilder('studentsubjectmap').innerJoin(
  //     'studentsubjectmap.school',
  //     'school',
  //     'school.id= :school_id',
  //     {
  //       school_id: school.id
  //     },
  //   ).getMany();
  //   return await this.remove(studentssm);
  // }
  
}
