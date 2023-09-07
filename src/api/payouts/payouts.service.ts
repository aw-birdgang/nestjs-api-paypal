import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom, lastValueFrom, map} from "rxjs";
import {ConfigService} from "../../config";
import {AuthService} from "../auth/auth.service";
import {ProductsResponseDto} from "../../dtos/catalog-products/product-response.dto";
import {InitiateCatalogProductsHeadersDto} from "../../dtos/catalog-products/initiate-catalog-product-headers.dto";
import {CreatePayoutsDto} from "../../dtos/payouts/create-payouts.dto";
import {PayoutsResponseDto} from "../../dtos/payouts/payouts-response.dto";

@Injectable()
export class PayoutsService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private authService: AuthService,
    ) {}

    private readonly logger = new Logger(PayoutsService.name);

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


    async getPayoutItemDetails(productId: string): Promise<ProductsResponseDto | void> {
        const headers = await this._preparePaypalRequestHeaders();
        const environment = this.configService.get("PAYPAL_ENVIRONMENT");
        const apiUrl = this.configService.getApiUrl(environment);
        this.logger.log(`request url :: ${apiUrl}/v1/payments/payouts-item/${productId}`);
        //
        const requestUrl = `${apiUrl}/v1/payments/payouts-item/${productId}`;

        const result = await lastValueFrom(
            this.httpService.get(requestUrl, { headers })
                .pipe(
                    map((response) => {
                        // catchError((error: AxiosError) => {
                        // ...PaypalErrorsConstants.INITIATE_ORDER_FAILED,
                        //         nativeError: errors?.response?.data || errors
                        //     }
                        this.logger.log(`request response.statusText :: ` + response.statusText);
                        return response.data;
                    }),
                )
        );
        this.logger.log("result.status :: " + result.status);
        return result;
    }

}
