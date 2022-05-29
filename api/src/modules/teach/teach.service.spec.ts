import { Test, TestingModule } from '@nestjs/testing';
import { TeachService } from './teach.service';

describe('TeachService', () => {
  let service: TeachService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeachService],
    }).compile();

    service = module.get<TeachService>(TeachService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
