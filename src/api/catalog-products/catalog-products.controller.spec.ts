import { Test, TestingModule } from '@nestjs/testing';
import { CatalogProductsController } from './catalog-products.controller';

describe('CatalogProductsController', () => {
  let controller: CatalogProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogProductsController],
    }).compile();

    controller = module.get<CatalogProductsController>(CatalogProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
