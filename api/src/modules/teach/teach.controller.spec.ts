import { Test, TestingModule } from '@nestjs/testing';
import { TeachController } from './teach.controller';
import { TeachService } from './teach.service';

describe('TeachController', () => {
  let controller: TeachController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeachController],
      providers: [TeachService],
    }).compile();

    controller = module.get<TeachController>(TeachController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
