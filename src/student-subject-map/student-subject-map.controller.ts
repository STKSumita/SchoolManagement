import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentSubjectMapService } from './student-subject-map.service';
import { CreateStudentSubjectMapDto } from './dto/create-student-subject-map.dto';
import { UpdateStudentSubjectMapDto } from './dto/update-student-subject-map.dto';

@Controller('studentsubjectmap')
export class StudentSubjectMapController {
  constructor(private readonly studentSubjectMapService: StudentSubjectMapService) {}

  @Post()
  async create(@Body() createStudentSubjectMapDto: CreateStudentSubjectMapDto) {
   await this.studentSubjectMapService.create(createStudentSubjectMapDto);
   return {
    status: 200
   }
  }

  @Get()
  async findAll() {
    return await  this.studentSubjectMapService.findAll();
  
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await  this.studentSubjectMapService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStudentSubjectMapDto: UpdateStudentSubjectMapDto) {
     await this.studentSubjectMapService.update(id, updateStudentSubjectMapDto);
     return {
      status: 200
     }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
     await this.studentSubjectMapService.remove(id);
     return {
      status: 200
     }
  }
}
