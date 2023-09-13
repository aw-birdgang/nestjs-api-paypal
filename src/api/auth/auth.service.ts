import {Injectable, Logger} from '@nestjs/common';

import {PAYPAL_AUTHORIZATION_HEADERS} from "../../constants";
import {InitiateTokenResponseDto} from "../../dtos";
import {lastValueFrom, map} from 'rxjs';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "../../config";

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    private readonly logger = new Logger(AuthService.name);

    getBasicKey() {
        const clientId = this.configService.get("PAYPAL_CLIENT_ID");
        const clientSecret = this.configService.get("PAYPAL_CLIENT_SECRET");
        this.logger.log(`clientId :: ${clientId} ,  clientSecret :: ${clientSecret}`);
        return Buffer.from(clientId + ':' + clientSecret).toString('base64');
    }

    async getAccessToken(): Promise<InitiateTokenResponseDto> {
        const environment = this.configService.get("PAYPAL_ENVIRONMENT");
        const apiUrl = this.configService.getApiUrl(environment);
        const url = `${apiUrl}/v1/oauth2/token`;
        const basicKey = this.getBasicKey();
        const data = new URLSearchParams();
        data.append('grant_type' , 'client_credentials');
        return await lastValueFrom(
            this.httpService.post(url, data, {
                headers: {
                    ...PAYPAL_AUTHORIZATION_HEADERS,
                    Authorization: `Basic ${basicKey}`
                }
            }).pipe(
                map(response => response?.data),
                // catchError((error: AxiosError) => {
                //         this.logger.error(`upload file fail : ${error}`)
                //         throw 'upload file fail'
                //     }
                )
            );
    }


}
// https://uri.paypal.com/services/invoicing
// https://uri.paypal.com/services/disputes/read-buyer
// https://uri.paypal.com/services/payments/realtimepayment
// https://uri.paypal.com/services/disputes/update-seller
// https://uri.paypal.com/services/payments/payment/authcapture
// openid
// https://uri.paypal.com/services/disputes/read-seller
// https://uri.paypal.com/services/payments/refund
// https://api.paypal.com/v1/vault/credit-card
// https://api.paypal.com/v1/payments/.*
// https://uri.paypal.com/payments/payouts
// https://api.paypal.com/v1/vault/credit-card/.*
// https://uri.paypal.com/services/subscriptions
// https://uri.paypal.com/services/applications/webhooks
