import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { School } from 'src/school/entities/school.entity';

@Injectable()
export class subjectRepository extends Repository<Subject> {
  constructor(private _dataSource: DataSource) {
    super(Subject, _dataSource.createEntityManager());
  }

  async findBySchoolid(school_id: string) {
    const subjectquery = this.createQueryBuilder('subject');
    const subject = await subjectquery
      .innerJoinAndSelect('subject.school', 'school', 'school.id= :school_id', {
        school_id,
      })
      .getMany();
    return subject;
  }

  async removeByschool(school: School) {
    const schoolsubject = await this.createQueryBuilder('subject').innerJoin(
      'subject.school',
      'school',
      'school.id= :school_id',
      {
        school_id: school.id
      },
    ).getMany();
    return await this.remove(schoolsubject);
  }
}
