import { Test, TestingModule } from '@nestjs/testing';
import { PayoutsController } from './payouts.controller';

describe('PayoutsController', () => {
  let controller: PayoutsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayoutsController],
    }).compile();

    controller = module.get<PayoutsController>(PayoutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
