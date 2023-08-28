import {Controller, Get, HttpStatus, Logger, Param, Query, Res} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {PaymentsService} from "@app/api/payments/payments.service";
import {Response} from "express";
import {instanceToPlain} from "class-transformer";

@Controller('v1/payments')
@ApiTags('PAYMENTS API')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    private readonly logger = new Logger(PaymentsController.name);

    @Get()
    @ApiOperation({
        summary: '주문 정보 API',
        description: '주문 정보 한다.',
    })
    @ApiOkResponse({
        description: '주문 정보를 조회 한다.',
    })
    async getOrderDetails(
        @Res() res: Response,
    ) {
        const response = await this.paymentsService.paymentAuthorizations({
            Prefer: "return=representation"
        });
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }
}
