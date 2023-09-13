import {Body, Controller, Get, HttpStatus, Logger, Param, Post, Res} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Response} from "express";
import {instanceToPlain} from "class-transformer";
import {PayoutsService} from "./payouts.service";
import {CreateCatalogProductsDto} from "../../dtos/catalog-products/create-catalog-products.dto";
import {CreatePayoutsDto} from "../../dtos/payouts/create-payouts.dto";

@Controller('v1/payouts')
@ApiTags('PAYOUTS API')
export class PayoutsController {

    constructor(private readonly payoutsService: PayoutsService) {}

    private readonly logger = new Logger(PayoutsController.name);

    @Post()
    @ApiOperation({
        summary: '지불금 정보 생성 API',
        description: '지불금 정보 생성 한다.',
    })
    @ApiOkResponse({
        description: '지불금 정보를 생성 합니다.',
    })
    async createPayouts(
        @Body() requestDto: CreateCatalogProductsDto,
        @Res() res: Response,
    ): Promise<any> {
        const payload: CreatePayoutsDto = {
            sender_batch_header: {
                sender_batch_id: "Payouts_2020_100007",
                email_subject: "You have a payout!",
                email_message: "You have received a payout! Thanks for using our service!"
            },
            items: [
            {
                recipient_type: "EMAIL",
                amount: {
                    value: "9.87", "currency": "USD"
                },
                note: "Thanks for your patronage!",
                sender_item_id: "PROD-15W14893P89604821",
                receiver: "birdgang82@gmail.com",
                recipient_wallet: "RECIPIENT_SELECTED"
            }
            ]
        };
        const response = await this.payoutsService.createPayout(payload, {});
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }


    @Get(':id')
    @ApiOperation({
        summary: '지불금 정보 조회 API',
        description: '지불금 정보 조회 한다.',
    })
    @ApiOkResponse({
        description: '지불금 정보를 조회 한다.',
    })
    async getCatalogProductDetails(
        @Param('id') id: string, //"PROD-96H18050RJ216833P"
        @Res() res: Response,
    ) {
        const response = await this.payoutsService.getPayoutItemDetails(id);
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }
}
