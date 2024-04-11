import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { studentRepository } from './student.repository';
import { schoolRepository } from 'src/school/school.repository';
import { subjectRepository } from 'src/subject/subject.repository';
import { studentsubjectmapRepository } from 'src/student-subject-map/studentsubmap.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService, studentRepository, schoolRepository, subjectRepository, studentsubjectmapRepository],
})
export class StudentModule {}
