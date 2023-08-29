import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from "@app/config";
import {HttpService} from "@nestjs/axios";
import {AuthService} from "@app/api/auth/auth.service";
import {CreatePayoutsDto} from "@app/dtos/payouts/create-payouts.dto";
import {InitiateCatalogProductsHeadersDto} from "@app/dtos/catalog-products/initiate-catalog-product-headers.dto";
import {PayoutsResponseDto} from "@app/dtos/payouts/payouts-response.dto";
import {firstValueFrom, map} from "rxjs";

@Injectable()
export class SubscriptionsService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private authService: AuthService,
    ) {}

    private readonly logger = new Logger(SubscriptionsService.name);

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


    /**
     *
     * @param orderPayload
     * @param headers
     */
    async createPayout(orderPayload: CreatePayoutsDto, headers?: InitiateCatalogProductsHeadersDto): Promise<PayoutsResponseDto> {
        const _headers = await this._preparePaypalRequestHeaders(headers);
        const environment = this.configService.get("PAYPAL_ENVIRONMENT");
        const apiUrl = this.configService.getApiUrl(environment);
        const requestUrl = `${apiUrl}/v1/payments/payouts`;
        this.logger.log(`createPayout > request url :: ` + requestUrl);

        return await firstValueFrom(
            this.httpService.post(requestUrl, orderPayload, {
                headers: _headers
            }).pipe(
                map(response => response?.data),
            )
        );
    }


}
