import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService,) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    await this.studentService.create(createStudentDto);
    return {
      status: 200,
    }
  }

  @Get()
  async findAll() {
    const student = await this.studentService.findAll();
    return {
      status: 200,
      data: student
    }
    
}

  // @Get('school/:school_id')
  // async findBySchoolid(@Param('school_id') school_id: string) {
  //   const student = await this.studentService.findBySchoolid(school_id);
  //   const school = student[0].school;
  //   return {
  //     status: 200,
  //     data:{
  //       id:school.id,
  //       name:school.name
  //     },
  //     student: student.map(student =>({
  //       id: student.id,
  //       code: student.code,
  //       name: student.name,
  //       grade: student.grade
  //     }))
  //   }
  // }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const student = await this.studentService.findOne(id);
    if (!student) {
      throw new NotFoundException("Not Found");
    }
    return {
      status: 200,
      data: {
        id: student.id,
        code:student.code,
        name: student.name,
        grade: student.grade,
        school:student.school,
        subject:student.studentSubjectMap,
    
    }
  }}

  @Get('code/:code')
  async findOneByCode(@Param('code') code: string) {
    const student = await this.studentService.findOneByCode(code);
    if (!student) {
      throw new NotFoundException("Not Found");
    }
    return {
      status: 200,
      data: {
        id: student.id,
        code:student.code,
        name: student.name,
        grade: student.grade,
        school:student.school,
    }
  }}
  

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    await this.studentService.update(id, updateStudentDto);
    return {
      status: 200
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.studentService.remove(id);
    return {
      status: 200
    };
  }
}

