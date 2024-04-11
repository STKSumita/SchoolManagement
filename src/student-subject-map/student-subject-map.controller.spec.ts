import { Test, TestingModule } from '@nestjs/testing';
import { StudentSubjectMapController } from './student-subject-map.controller';
import { StudentSubjectMapService } from './student-subject-map.service';

describe('StudentSubjectMapController', () => {
  let controller: StudentSubjectMapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentSubjectMapController],
      providers: [StudentSubjectMapService],
    }).compile();

    controller = module.get<StudentSubjectMapController>(StudentSubjectMapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
