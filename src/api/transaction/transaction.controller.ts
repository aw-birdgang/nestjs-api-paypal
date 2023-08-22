import {Controller, Get, HttpStatus, Logger, Param, Query, Res} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Response} from "express";
import {instanceToPlain} from "class-transformer";
import {OrdersService} from "@app/api/orders/orders.service";
import {TransactionService} from "@app/api/transaction/transaction.service";

@Controller('v1/transaction')
@ApiTags('TRANSACTION API')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    private readonly logger = new Logger(TransactionController.name);

    @Get()
    @ApiOperation({
        summary: '트랜잭션 정보 API',
        description: '트랜잭션 정보 한다.',
    })
    @ApiOkResponse({
        description: '트랜잭션 정보를 조회 한다.',
    })
    async getTransactions(
        @Res() res: Response,
    ) {
        const response = await this.transactionService.getTransactions();
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }


}
