import { Test, TestingModule } from '@nestjs/testing';
import { StudentSubjectMapService } from './student-subject-map.service';

describe('StudentSubjectMapService', () => {
  let service: StudentSubjectMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentSubjectMapService],
    }).compile();

    service = module.get<StudentSubjectMapService>(StudentSubjectMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
