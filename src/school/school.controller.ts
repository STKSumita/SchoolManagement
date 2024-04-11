import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  async create(@Body() createSchoolDto: CreateSchoolDto) {
    await this.schoolService.create(createSchoolDto);
    return {
      status: 200,
    };
  }

  @Get()
  async findAll() {
    const school = await this.schoolService.findAll();
    const formatschool = await Promise.all(
      school.map(async (school) => {
        const studentcount = await this.schoolService.findNumOfstudent(
          school.id,
        );
        return {
          id: school.id,
          name: school.name,
          numberOfStudent: studentcount,
        };
      }),
    );
    return {
      status: 200,
      data: formatschool,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const school = await this.schoolService.findOne(id);
    if (!school) {
      throw new NotFoundException('Not Found');
    }
    return {
      status: 200,
      data: {
        id: school.id,
        name: school.name,
        student: school.student,
        subject: school.subject,
      },
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ) {
    await this.schoolService.update(id, updateSchoolDto);
    return {
      status: 200,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.schoolService.remove(id);
    return {
      status: 200,
    };
  }
}
