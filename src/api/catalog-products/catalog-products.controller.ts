import {Body, Controller, Get, HttpStatus, Logger, Param, Post, Res} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Response} from "express";
import {instanceToPlain} from "class-transformer";
import {CatalogProductsService} from "./catalog-products.service";
import {CreateCatalogProductsDto} from "../../dtos/catalog-products/create-catalog-products.dto";

@Controller('v1/catalog-products')
@ApiTags('CATALOG PRODUCTS API')
export class CatalogProductsController {

    constructor(private readonly catalogService: CatalogProductsService) {}

    private readonly logger = new Logger(CatalogProductsController.name);


    @Post()
    @ApiOperation({
        summary: '카탈 로그 제품 생성 API',
        description: '카탈 로그 제품 생성 한다.',
    })
    @ApiOkResponse({
        description: '카탈 로그 제품 정보를 생성 합니다.',
    })
    async createCatalogProducts(
        @Body() requestDto: CreateCatalogProductsDto,
        @Res() res: Response,
    ): Promise<any> {
        const payload: CreateCatalogProductsDto = {
            name: "Lotto Ticket 6/50",
            description: "Lotto Ticket Sample",
            type: "SERVICE",
        };
        const response = await this.catalogService.createCatalogProducts(payload, {
            Prefer: "return=representation"
        });
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }


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


    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'The found record',
    })
    @ApiOperation({
        summary: '제품 정보 조회 API',
        description: '제품 정보 조회 한다.',
    })
    @ApiOkResponse({
        description: '제품 정보를 조회 한다.',
    })
    async getCatalogProductDetails(
        @Param('id') id: string,
        @Res() res: Response,
    ) {
        const response = await this.catalogService.getCatalogProductDetails("PROD-96H18050RJ216833P");
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }

}
