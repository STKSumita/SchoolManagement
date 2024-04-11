import { Injectable } from '@nestjs/common';
import { UpdateStudentSubjectMapDto } from './dto/update-student-subject-map.dto';
import { StudentSubjectMap } from './entities/student-subject-map.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentSubjectMapDto } from './dto/create-student-subject-map.dto';
import { studentsubjectmapRepository } from './studentsubmap.repository';
import { schoolRepository } from 'src/school/school.repository';

@Injectable()
export class StudentSubjectMapService {
  constructor(
    @InjectRepository(studentsubjectmapRepository)
    private readonly studentsubjectmapRepository: studentsubjectmapRepository,
    
  ){
  }  
  async create(createStudentSubjectMapDto: CreateStudentSubjectMapDto) {
    const studentsubjectmap = this.studentsubjectmapRepository.create(createStudentSubjectMapDto)
        return await this.studentsubjectmapRepository.save(studentsubjectmap);
      }
    

  async findAll() {
    return await this.studentsubjectmapRepository.find({
      relations: {
        subject:true,
        student:true,
      }
    });
  }

  async findOne(id: string) {
    return await this.studentsubjectmapRepository.findOne({
      where: {id}, 
    });
  }

  async update(id: string, updatestudentsubjectmapDto: UpdateStudentSubjectMapDto) {
    const studentsubjectmap = await this.findOne(id);

    if (!studentsubjectmap) {
      console.error('ERROR');
    }
    Object.assign(studentsubjectmap, updatestudentsubjectmapDto);
    return  await this.studentsubjectmapRepository.save(studentsubjectmap);
  }

  async remove(id: string) {
    const studentsubjectmap = await this.findOne(id);

    if (!studentsubjectmap) {
     console.error('ERROR');
    }
    
    return  await this.studentsubjectmapRepository.remove(studentsubjectmap);
  }
}
