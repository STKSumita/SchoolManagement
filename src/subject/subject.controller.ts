import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    await this.subjectService.create(createSubjectDto);
    return {
      status: 200
    };
  }

  @Get()
  async findAll() {
    const subject = await this.subjectService.findAll();
    return {
      status: 200,
      data: subject
    }
  }

  @Get('school/:school_id')
  async findBySchoolid(@Param('school_id') school_id: string) {
    const subject = await this.subjectService.findBySchoolid(school_id);
    const school = subject[0].school;
    return {
      status: 200,
      data: {
        id: school.id,
        name: school.name
      },
      subject: subject.map(subject =>({
        id: subject.id,
        name: subject.name,
        grade: subject.grade
      }))
    }
  } 

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const subject = await this.subjectService.findOne(id);
    if (!subject) {
      throw new NotFoundException("Not Found");
    }
    return {
      status: 200,
      data: {
        id: subject.id,
        name: subject.name,
        grade: subject.grade,
        school:subject.school,
    }
    
  }
}
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    await this.subjectService.update(id, updateSubjectDto);
    return  {
      status: 200
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.subjectService.remove(id);
    return {
      status: 200
    };
  }
}
