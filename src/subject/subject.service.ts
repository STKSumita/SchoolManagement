import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { subjectRepository } from './subject.repository';
import { studentsubjectmapRepository } from 'src/student-subject-map/studentsubmap.repository';


@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(subjectRepository)
    private readonly subjectRepository: subjectRepository,
    @InjectRepository(studentsubjectmapRepository)
    private readonly studentsubjectmapRepository: studentsubjectmapRepository){
  }  
  async create(createSubjectDto: CreateSubjectDto) {
    const subject = this.subjectRepository.create(createSubjectDto)
        return await this.subjectRepository.save(subject);
      }
    
  async findAll() {
    return await this.subjectRepository.find({
      relations: {
        school: true,
        //studentsubjectmap:true
      }

    });
  }
  async findBySchoolid(school_id:string ) {
    const subject = await this.subjectRepository.findBySchoolid(school_id);
    if (!subject) {
      throw new NotFoundException();
    }
    return subject
   }

  async findOne(id: string) {
  return await this.subjectRepository.findOne({
      where: {id}, 
      relations:{
        school:true
      }
    })
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.findOne(id);

    if (!subject) {
      console.error('ERROR');
    }
    Object.assign(subject, updateSubjectDto);
    return  await this.subjectRepository.save(subject);
  }

  async remove(id: string) {
    const subject = await this.findOne(id);

    if (!subject) {
     console.error('ERROR');
    }
    await this.studentsubjectmapRepository.removeBysubject(subject)
    return  await this.subjectRepository.remove(subject);
  }
}
