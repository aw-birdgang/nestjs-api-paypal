import {Controller, Get, HttpStatus, Logger, Param, Query, Res} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Response} from "express";
import {instanceToPlain} from "class-transformer";
import {CatalogProductsService} from "@app/api/catalog-products/catalog-products.service";

@Controller('catalog-products')
@Controller('v1/catalog-products')
@ApiTags('CATALOG PRODUCTS API')
export class CatalogProductsController {

    constructor(private readonly catalogService: CatalogProductsService) {}

    private readonly logger = new Logger(CatalogProductsController.name);

    @Get()
    @ApiOperation({
        summary: '제품 정보 API',
        description: '제품 정보 한다.',
    })
    @ApiOkResponse({
        description: '제품 정보를 조회 한다.',
    })
    async getProductions(
        @Res() res: Response,
    ) {
        const response = await this.catalogService.getProductions();
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }



    @Get('catalogProduct/:id')
    @ApiOperation({
        summary: '제품 정보 API',
        description: '제품 정보 한다.',
    })
    @ApiOkResponse({
        description: '제품 정보를 조회 한다.',
    })
    async getCatalogProductDetails(
        @Res() res: Response,
    ) {
        const response = await this.catalogService.getCatalogProductDetails("PROD-96H18050RJ216833P");
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }

}
