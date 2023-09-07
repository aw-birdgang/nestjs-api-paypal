import {Body, Controller, Get, HttpStatus, Logger, Param, Post, Put, Query, Res} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Response} from 'express';
import {instanceToPlain} from 'class-transformer';
import {OrdersService} from "./orders.service";
import {CreatePaypalOrderDto} from "../../dtos";
import {ConfirmPaypalOrderDto} from "../../dtos/order/confirm-paypal-order.dto";

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
    async createOrder(
        @Body() requestDto: CreatePaypalOrderDto,
        @Res() res: Response,
    ): Promise<any> {
        const payload: CreatePaypalOrderDto = {
            intent: "CAPTURE",
            // purchase_units: [
            //     {
            //         amount: {
            //             "currency_code": "USD",
            //             "value": "100.00"
            //         },
            //         reference_id: "monitor"
            //     }
            // ]
        };
        const response = await this.ordersService.initiateOrder(payload, {
            Prefer: "return=representation"
        });
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }


    @Put()
    @ApiOperation({
        summary: '주문 수정 API',
        description: '주문 수정 한다.',
    })
    @ApiOkResponse({
        description: '주문 정보를 수정 합니다.',
    })
    async updateOrder(
        @Body() requestDto: CreatePaypalOrderDto,
        @Res() res: Response,
    ): Promise<any> {
        const payload: CreatePaypalOrderDto = {
            intent: "CAPTURE",
            // purchase_units: [
            //     {
            //         amount: {
            //             "currency_code": "USD",
            //             "value": "100.00"
            //         },
            //         reference_id: "monitor"
            //     }
            // ]
        };

        const order = await this.ordersService.initiateOrder(payload, {
            Prefer: "return=representation"
        });
        const updateResponse = await this.ordersService.updateOrder(order.id, [
            {
                op: 'add',
                path: `/purchase_units/@reference_id=='${order.purchase_units[0].reference_id}'/shipping/address`,
                value: {
                    "address_line_1": "123 Townsend St",
                    "address_line_2": "Floor 6",
                    "admin_area_2": "San Francisco",
                    "admin_area_1": "CA",
                    "postal_code": "94107",
                    "country_code": "US"
                }
            }
        ]);
        return res.status(HttpStatus.OK).json(instanceToPlain(updateResponse));
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
        const response = await this.ordersService.getOrderDetails("6VW70343A65796208");
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }


    @Post('confirm/:id')
    @ApiOperation({
        summary: '주문 확인 API',
        description: '주문 확인 한다.',
    })
    @ApiOkResponse({
        description: '주문 확인 생성 합니다.',
    })
    async confirmOrder(
        @Body() requestDto: ConfirmPaypalOrderDto,
        @Res() res: Response,
    ): Promise<any> {
        const payload: ConfirmPaypalOrderDto = {
            payment_source: {
                paypal: {
                    name: {
                        given_name: "John",
                        surname: "Doe"
                    },
                    email_address: "customer@example.com",
                    experience_context: {
                        payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
                        brand_name: "EXAMPLE INC",
                        locale: "en-US",
                        landing_page: "LOGIN",
                        shipping_preference: "SET_PROVIDED_ADDRESS",
                        user_action: "PAY_NOW",
                        return_url: "https://example.com/returnUrl",
                        cancel_url: "https://example.com/cancelUrl"
                    }
                }
            }
        };

        const response = await this.ordersService.confirmOrder("6VW70343A65796208", payload,);
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }


}
