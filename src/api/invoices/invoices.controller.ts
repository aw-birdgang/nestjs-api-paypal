import {Controller, Get, HttpStatus, Logger, Res} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Response} from "express";
import {instanceToPlain} from "class-transformer";
import {InvoicesService} from "./invoices.service";

@Controller('v1/invoices')
@ApiTags('INVOICES API')
export class InvoicesController {
    constructor(private readonly invoicesService: InvoicesService) {}

    private readonly logger = new Logger(InvoicesController.name);

    @Get()
    @ApiOperation({
        summary: '송장 정보 API',
        description: '송장 정보 한다.',
    })
    @ApiOkResponse({
        description: '송장 정보를 조회 한다.',
    })
    async getProductions(
        @Res() res: Response,
    ) {
        const response = await this.invoicesService.getInvoices();
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }



}
