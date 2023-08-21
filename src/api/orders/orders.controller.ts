import {Body, Controller, Get, HttpStatus, Logger, Param, Post, Query, Res} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {OrdersService} from "@app/api/orders/orders.service";
import {CreatePaypalOrderDto} from "@app/dtos";
import {Response} from 'express';
import {instanceToPlain} from 'class-transformer';

@Controller('v1/orders')
@ApiTags('ORDERS API')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    private readonly logger = new Logger(OrdersController.name);

    @Post()
    @ApiOperation({
        summary: '주문 생성 API',
        description: '주문 생성 한다.',
    })
    @ApiOkResponse({
        description: '주문 정보를 생성 합니다.',
    })
    async initiateOrder(
        @Body() requestDto: CreatePaypalOrderDto,
        @Res() res: Response,
    ): Promise<any> {
        const payload: CreatePaypalOrderDto = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        "currency_code": "USD",
                        "value": "100.00"
                    },
                    reference_id: "monitor"
                }
            ]
        };
        return this.ordersService.initiateOrder(payload, {
            Prefer: "return=representation"
        });
    }

    @Get(':id')
    @ApiOperation({
        summary: '주문 정보 API',
        description: '주문 정보 한다.',
    })
    @ApiOkResponse({
        description: '주문 정보를 조회 한다.',
    })
    async getOrderDetails(
        @Param('id') id: string,
        @Query('paid') read: number,
        @Res() res: Response,
    ) {
        const response = await this.ordersService.getOrderDetails(id);
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }
}
