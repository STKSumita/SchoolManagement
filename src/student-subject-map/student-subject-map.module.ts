import { Module } from '@nestjs/common';
import { StudentSubjectMapService } from './student-subject-map.service';
import { StudentSubjectMapController } from './student-subject-map.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentSubjectMap } from './entities/student-subject-map.entity';
import { studentsubjectmapRepository } from './studentsubmap.repository';
import { subjectRepository } from 'src/subject/subject.repository';
import { studentRepository } from 'src/student/student.repository';

@Module({
  imports:[TypeOrmModule.forFeature([StudentSubjectMap])],
  controllers: [StudentSubjectMapController],
  providers: [StudentSubjectMapService, studentsubjectmapRepository, subjectRepository, studentRepository],
})
export class StudentSubjectMapModule {}
