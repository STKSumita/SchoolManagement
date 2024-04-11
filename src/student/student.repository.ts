import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { School } from 'src/school/entities/school.entity';
import { Subject } from 'src/subject/entities/subject.entity';

@Injectable()
export class studentRepository extends Repository<Student> {
  removeBysubject(subject: Subject) {
    throw new Error('Method not implemented.');
  }
  constructor(private _dataSource: DataSource) {
    super(Student, _dataSource.createEntityManager());
  }

  // async findBySchoolid(school_id: string) {
  //   const studentquery = this.createQueryBuilder('student');
  //   const student = await studentquery
  //     .innerJoinAndSelect('student.school', 'school', 'school.id= :school_id', {
  //       school_id,
  //     })

  //     .getMany();
  //   return student;
  // }

  async removeByschool(school: School) {
    const schoolstudent = await this.createQueryBuilder('student')
      .innerJoin('student.school', 'school', 'school.id= :school_id', {
        school_id: school.id,
      })
      .getMany();
    return await this.remove(schoolstudent);
  }

  async findAmountByschoolid(school_id: string): Promise<number> {
    const studentquery = this.createQueryBuilder('student');
    const count = await studentquery
      .innerJoinAndSelect('student.school', 'school')
      .where('school.id= :school_id', { school_id })
      .getCount();

    return count;
  }
}
