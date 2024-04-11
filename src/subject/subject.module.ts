import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { subjectRepository } from './subject.repository';
import { schoolRepository } from 'src/school/school.repository';
import { studentsubjectmapRepository } from 'src/student-subject-map/studentsubmap.repository';

@Module({
 imports: [TypeOrmModule.forFeature([Subject])],
  controllers: [SubjectController],
  providers: [SubjectService, subjectRepository, schoolRepository, studentsubjectmapRepository],
})
export class SubjectModule {}
