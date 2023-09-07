import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom, map} from "rxjs";
import {ConfigService} from "../../config";
import {AuthService} from "../auth/auth.service";
import {InitiateOrderHeadersDto, PaypalOrderDto} from "../../dtos";

@Injectable()
export class PaymentsService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private authService: AuthService,
    ) {}

    private readonly logger = new Logger(PaymentsService.name);

    async _preparePaypalRequestHeaders(customHeaders?: any) {
        const initiateTokenResponse = await this.authService.getAccessToken();
        const { access_token } = initiateTokenResponse;
        this.logger.log(`access_token :: ${access_token}`);
        return {
            'Content-Type': 'application/json',
            'Authorization': access_token ? `Bearer ${access_token}` : `Basic ${this.authService.getBasicKey()}`,
            ...customHeaders
        };
    }

    async paymentAuthorizations(headers?: InitiateOrderHeadersDto): Promise<PaypalOrderDto> {
        const _headers = await this._preparePaypalRequestHeaders(headers);
        const environment = this.configService.get("PAYPAL_ENVIRONMENT");
        const apiUrl = this.configService.getApiUrl(environment);
        const authorizationId = "6VW70343A65796208";
        const requestUrl = `${apiUrl}/v2/payments/authorizations/${authorizationId}`;
        this.logger.log(`paymentAuthorizations > requestUrl :: ${requestUrl}`);
        return await firstValueFrom(
            this.httpService.post(requestUrl, {
                headers: _headers
            }).pipe(
                map(response => response?.data),
                // catchError((error: AxiosError) => {
                // ...PaypalErrorsConstants.INITIATE_ORDER_FAILED,
                //         nativeError: errors?.response?.data || errors
                //     }
            )
        );
    }
}
