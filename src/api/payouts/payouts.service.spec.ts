import { Test, TestingModule } from '@nestjs/testing';
import { PayoutsService } from './payouts.service';

describe('PayoutsService', () => {
  let service: PayoutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayoutsService],
    }).compile();

    service = module.get<PayoutsService>(PayoutsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
