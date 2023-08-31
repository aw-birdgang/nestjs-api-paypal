import {Body, Controller, Get, HttpStatus, Logger, Post, Res} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {Response} from "express";
import {instanceToPlain} from "class-transformer";
import {SubscriptionsService} from "@app/api/subscriptions/subscriptions.service";
import {CreatePlansDto} from "@app/dtos/subscriptions/create-plans.dto";

@Controller('v1/subscriptions')
@ApiTags('SUBSCRIPTIONS API')
export class SubscriptionsController {

    constructor(private readonly subscriptionsService: SubscriptionsService) {}

    private readonly logger = new Logger(SubscriptionsController.name);

    @Post()
    @ApiOperation({
        summary: '구독 정보 생성 API',
        description: '구독 정보 생성 한다.',
    })
    @ApiOkResponse({
        description: '구독 정보를 생성 합니다.',
    })
    async createPlans(
        @Body() requestDto: CreatePlansDto,
        @Res() res: Response,
    ): Promise<any> {
        const payload: CreatePlansDto = {
            product_id: "PROD-96H18050RJ216833P",
            name: "Lotto Ticket 6/50",
            billing_cycles: [
                {
                    frequency: {
                        interval_unit: "MONTH",
                        interval_count: 1
                    },
                    tenure_type: "TRIAL",
                    sequence: 1,
                    total_cycles: 2,
                    pricing_scheme: {
                        fixed_price: {
                            value: "3",
                            currency_code: "USD"
                        }
                    }
                },
                {
                    frequency: {
                        interval_unit: "MONTH",
                        interval_count: 1
                    },
                    tenure_type: "TRIAL",
                    sequence: 2,
                    total_cycles: 3,
                    pricing_scheme: {
                        fixed_price: {
                            value: "6",
                            currency_code: "USD"
                        }
                    }
                },
            ],
            payment_preferences: {
                auto_bill_outstanding: true,
                setup_fee: {
                    value: "10",
                    currency_code: "USD"
                },
                setup_fee_failure_action: "CONTINUE",
                payment_failure_threshold: 3
            },
        };
        const response = await this.subscriptionsService.createPlan(payload, {
            // 'X-PAYPAL-SECURITY-CONTEXT': {
            //     consumer:{
            //         accountNumber: 1181198218909172527,
            //         merchantId: "5KW8F2FXKX5HA"
            //     },
            //     merchant:{
            //         accountNumber:1659371090107732880,
            //         merchantId:"2J6QB8YJQSJRJ"
            //     },
            //     apiCaller:{
            //         clientId:"AdtlNBDhgmQWi2xk6edqJVKklPFyDWxtyKuXuyVT-OgdnnKpAVsbKHgvqHHP",
            //         appId:"APP-6DV794347V142302B",
            //         payerId:"2J6QB8YJQSJRJ",
            //         accountNumber:"1659371090107732880"
            //     },
            //     scopes:[
            //         "https://api-m.paypal.com/v1/subscription/.*",
            //         "https://uri.paypal.com/services/subscription","openid"
            //     ]
            // },
            'Prefer': "return=representation",
            // 'PayPal-Request-Id': 'PLAN-18062019-001',
        });
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }



    @Get()
    @ApiOperation({
        summary: '구독 정보 API',
        description: '구독 정보 한다.',
    })
    @ApiOkResponse({
        description: '구독 정보를 조회 한다.',
    })
    async getProductions(
        @Res() res: Response,
    ) {
        const response = await this.subscriptionsService.getPlans();
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }


}
