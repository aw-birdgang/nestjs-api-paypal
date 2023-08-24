import { Test, TestingModule } from '@nestjs/testing';
import { CatalogProductsService } from './catalog-products.service';

describe('CatalogProductsService', () => {
  let service: CatalogProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatalogProductsService],
    }).compile();

    service = module.get<CatalogProductsService>(CatalogProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
