import { Test, TestingModule } from '@nestjs/testing';
import { AddTrackingController } from './add-tracking.controller';

describe('AddTrackingController', () => {
  let controller: AddTrackingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddTrackingController],
    }).compile();

    controller = module.get<AddTrackingController>(AddTrackingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
