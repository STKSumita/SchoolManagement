import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { schoolRepository } from './school.repository';
import { studentRepository } from 'src/student/student.repository';
import { subjectRepository } from 'src/subject/subject.repository';
import { studentsubjectmapRepository } from 'src/student-subject-map/studentsubmap.repository';

@Module({
  imports: [TypeOrmModule.forFeature([School])],
  controllers: [SchoolController],
  providers: [SchoolService, schoolRepository, studentRepository, subjectRepository,studentsubjectmapRepository ],
})
export class SchoolModule {}
