import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { School } from "./entities/school.entity";

@Injectable()
export class schoolRepository extends Repository<School> {
    constructor (
        private _dataSource: DataSource,
    ){
        super(School, _dataSource.createEntityManager())
    }


    async removeByschool(school: School) {
        const schoolstudent = await this.createQueryBuilder('student')
          .innerJoin('student.school', 'school', 'school.id= :school_id', {
            school_id: school.id,
          })
          .getMany();
        return await this.remove(schoolstudent);
      }

//       async removeByschoolmap(school: School) {
//         const schoolstudentmap = await this.createQueryBuilder('studentsubjectmap')
//           .innerJoin('studentsubjectmap.school', 'school', 'school.id= :school_id', {
//             school_id: school.id,
//           })
//           .getMany();
//         return await this.remove(schoolstudentmap);
//       }
    }