import {ProductsResponseDto} from "./product-response.dto";

export class CatalogsProductsResponseDto {
    total_times: number;
    total_pages: number;
    products: ProductsResponseDto[];
}
