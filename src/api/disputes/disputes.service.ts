import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom, lastValueFrom, map} from "rxjs";
import {ConfigService} from "../../config";
import {AuthService} from "../auth/auth.service";
import {CreateDisputesDto} from "../../dtos/disputes/create-disputes.dto";
import {InitiateCatalogProductsHeadersDto} from "../../dtos/catalog-products/initiate-catalog-product-headers.dto";
import {DisputeResponseDto} from "../../dtos/disputes/dispute-response.dto";
import {DisputesResponseDto} from "../../dtos/disputes/disputes-response.dto";

@Injectable()
export class DisputesService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private authService: AuthService,
    ) {}

    private readonly logger = new Logger(DisputesService.name);

    async _preparePaypalRequestHeaders(customHeaders?: any) {
        const initiateTokenResponse = await this.authService.getAccessToken();
        const { access_token } = initiateTokenResponse;
        this.logger.log(`access_token :: ${access_token}`)
        return {
            'Content-Type': 'application/json',
            'Authorization': access_token ? `Bearer ${access_token}` : `Basic ${this.authService.getBasicKey()}`,
            ...customHeaders
        };
    }


    async createDisputes(orderPayload: CreateDisputesDto, headers?: InitiateCatalogProductsHeadersDto): Promise<DisputeResponseDto> {
        const _headers = await this._preparePaypalRequestHeaders(headers);
        const environment = this.configService.get("PAYPAL_ENVIRONMENT");
        const apiUrl = this.configService.getApiUrl(environment);
        const id = "";
        //
        const requestUrl = `${apiUrl}/v1/customer/disputes/${id}/acknowledge-return-item`;
        this.logger.log(`createDisputes > request url :: ` + requestUrl);

        return await firstValueFrom(
            this.httpService.post(requestUrl, orderPayload, {
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


    async getDisputes(): Promise<DisputesResponseDto> {
        const headers = await this._preparePaypalRequestHeaders();
        const environment = this.configService.get("PAYPAL_ENVIRONMENT");
        const apiUrl = this.configService.getApiUrl(environment);
        //
        const requestUrl = `${apiUrl}/v1/customer/disputes`;
        this.logger.log(`getDisputes > request url :: ` + requestUrl);

        return await lastValueFrom(
            this.httpService.get(
                requestUrl,
                {
                    headers
                }
            )
            .pipe(
                map(response => response?.data),
            )
        );
    }


}
