import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from "@app/config";
import {HttpService} from "@nestjs/axios";
import {AuthService} from "@app/api/auth/auth.service";
import {CreatePaypalOrderDto, InitiateOrderHeadersDto, InitiateTokenResponseDto, PaypalOrderDto} from "@app/dtos";
import {firstValueFrom, lastValueFrom, map} from "rxjs";

@Injectable()
export class TransactionService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private authService: AuthService,
    ) {}

    private readonly logger = new Logger(TransactionService.name);

    getBasicKey() {
        const clientId = this.configService.get("PAYPAL_CLIENT_ID");
        const clientSecret = this.configService.get("PAYPAL_CLIENT_SECRET");
        this.logger.log(`clientId :: ${clientId} ,  clientSecret :: ${clientSecret}`);
        return Buffer.from(clientId + ':' + clientSecret).toString('base64');
    }

    async _preparePaypalRequestHeaders(customHeaders?: any) {
        const initiateTokenResponse = await this.authService.getAccessToken();
        const { access_token } = initiateTokenResponse;
        this.logger.log(`access_token :: ${access_token}`);


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

        return {
            'X-PAYPAL-SECURITY-CONTEXT': '{"version":"1.2","actor":{"client_id":"AZiIT7ppKUStdPSrY4pgORnHP7PLRlxubrC2fl4GjS7FN8kvh8YD6CoHNbP3s9iLWzK_VX3UPxK8DROZ","id":"35740404","auth_claims":["CLIENT_ID_SECRET"],"auth_state":"LOGGEDIN","account_number":"1480460762532829633","encrypted_account_number":"JVH3C98SC4E84","party_id":"1480460762532829633","user_type":"API_CALLER"},"auth_token_type":"ACCESS_TOKEN","scopes":["https://uri.paypal.com/services/reporting/search/read"],"client_id":"AZiIT7ppKUStdPSrY4pgORnHP7PLRlxubrC2fl4GjS7FN8kvh8YD6CoHNbP3s9iLWzK_VX3UPxK8DROZ","app_id":"APP-80W284485P519543T","claims":{"actor_payer_id":"JVH3C98SC4E84","internal_application":"false"},"subjects":[{"subject":{"id":"35762049","auth_claims":["PAYER_ID"],"auth_state":"IDENTIFIED","account_number":"1256692217768566521","encrypted_account_number":"XZXSPECPDZHZU","party_id":"2277051500535724448","user_type":"MERCHANT"},"features":[]}]}',
            'Content-Type': 'application/json',
            'Authorization': access_token ? `Bearer ${access_token}` : `Basic ${this.authService.getBasicKey()}`,
            ...customHeaders
        };
    }

    async getTransactions(): Promise<InitiateTokenResponseDto> {
        const headers = await this._preparePaypalRequestHeaders();
        return await lastValueFrom(
            this.httpService.get(
                'https://api-m.sandbox.paypal.com/v1/reporting/transactions',
                {
                    headers
                }
            )
            .pipe(
                map(response => response?.data),
                // catchError((error: AxiosError) => {
                //         this.logger.error(`upload file fail : ${error}`)
                //         throw 'upload file fail'
                //     }
            )
        );
    }


}
