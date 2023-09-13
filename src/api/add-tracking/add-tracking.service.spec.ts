import { Test, TestingModule } from '@nestjs/testing';
import { AddTrackingService } from './add-tracking.service';

describe('AddTrackingService', () => {
  let service: AddTrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddTrackingService],
    }).compile();

    service = module.get<AddTrackingService>(AddTrackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
