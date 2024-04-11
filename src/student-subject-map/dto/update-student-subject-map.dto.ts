import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentSubjectMapDto } from './create-student-subject-map.dto';

export class UpdateStudentSubjectMapDto extends PartialType(CreateStudentSubjectMapDto) {}
