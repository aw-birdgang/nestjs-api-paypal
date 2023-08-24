import {ProductsResponseDto} from "@app/dtos/catalog-products/product-response.dto";

export class CatalogsProductsResponseDto {
    total_times: number;
    total_pages: number;
    products: ProductsResponseDto[];
}
