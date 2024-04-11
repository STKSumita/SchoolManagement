import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { School } from 'src/school/entities/school.entity';
import { studentRepository } from './student.repository';
import { subjectRepository } from 'src/subject/subject.repository';
import { studentsubjectmapRepository } from 'src/student-subject-map/studentsubmap.repository';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(studentRepository)
    private readonly studentRepository: studentRepository,
    @InjectRepository(subjectRepository)
    private readonly subjectRepository: subjectRepository,
    @InjectRepository(studentsubjectmapRepository)
    private readonly studentsubjectmapRepository: studentsubjectmapRepository
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const student = this.studentRepository.create(createStudentDto);
    return await this.studentRepository.save(student);
  }

  async findAll() {
    return await this.studentRepository.find({
      relations: {
        school: true,
        // studentSubjectMap: true,
      },
    });
  }

  // async findBySchoolid(school_id: string) {
  //   const student = await this.studentRepository.findBySchoolid(school_id);
  //   if (!student) {
  //     throw new NotFoundException();
  //   }
  //   return student;
  // }

  async findOne(id: string, ssmap: boolean =true ) {
    return await this.studentRepository.findOne({
      where: { id },
      relations: {
        school: true,
        studentSubjectMap: ssmap,
      },
    });
    
  }

  async findOneByCode(code: string) {
    return await this.studentRepository.findOne({
      where: { code },
      relations: ['school'],
    });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id,false);
  if (!student) {
      console.error('ERROR');
    }
    if (updateStudentDto.subject_id){
      const subject = await this.subjectRepository.findOne({
        where:{id:updateStudentDto.subject_id} //หาตารางวิชาตามไอดี
      });
      if (!subject) {
        console.error('ERROR');
      }
      await this.studentsubjectmapRepository.enrollsubject(student,subject);
      delete updateStudentDto.subject_id;
    }
    Object.assign(student, updateStudentDto);
    return await this.studentRepository.save(student);
  }
    

  async remove(id: string) {
    const student = await this.findOne(id);

    if (!student) {
      console.error('ERROR');
    }
    await this.studentsubjectmapRepository.removeBystudent(student)
    return await this.studentRepository.remove(student);
  }
}
