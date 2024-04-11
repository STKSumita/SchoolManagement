import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { schoolRepository } from './school.repository';
import { subjectRepository } from 'src/subject/subject.repository';
import { studentRepository } from 'src/student/student.repository';
import { studentsubjectmapRepository } from 'src/student-subject-map/studentsubmap.repository';

@Injectable()
export class SchoolService {
  
  constructor(
    @InjectRepository(schoolRepository)
    private readonly schoolRepository: schoolRepository,
    @InjectRepository(subjectRepository)
    private readonly subjectRepository: subjectRepository,
    @InjectRepository(studentRepository)
    private readonly studentRepository: studentRepository,
    @InjectRepository(studentsubjectmapRepository)
    private readonly studentsubjectmapRepository: studentRepository
  ) {}
  async create(createSchoolDto: CreateSchoolDto) {
    const school = this.schoolRepository.create(createSchoolDto);
    return await this.schoolRepository.save(school);
  }

  async findAll() {
    return await this.schoolRepository.find({
      relations: {
        subject: true,
        //student: true,
      },
    });
  }

  async findNumOfstudent(school_id:string){
    const Amount = await this.studentRepository.findAmountByschoolid(school_id);
    return Amount;
  }

  async findOne(id: string) {
    return await this.schoolRepository.findOne({
      where: { id },
      relations: {
        student: true,
        subject: true,
      },
      
    }
  );
    
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto) {
    const school = await this.findOne(id);

    if (!school) {
      console.error('ERROR');
    }
    Object.assign(school, updateSchoolDto);
    return await this.schoolRepository.save(school);
  }

  async remove(id: string) {
    const school = await this.findOne(id);

    if (!school) {
      console.error('ERROR');
    }
    await this.studentsubjectmapRepository.removeByschool(school)
    await this.subjectRepository.removeByschool(school)
    await this.studentRepository.removeByschool(school)
    return await this.schoolRepository.remove(school);
  }

  
}
