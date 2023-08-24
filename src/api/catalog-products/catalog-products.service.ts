import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from "@app/config";
import {HttpService} from "@nestjs/axios";
import {AuthService} from "@app/api/auth/auth.service";
import {CreatePaypalOrderDto, InitiateOrderHeadersDto, InitiateTokenResponseDto, PaypalOrderDto} from "@app/dtos";
import {firstValueFrom, lastValueFrom, map, Observable} from "rxjs";
import {UpdatePaypalOrderDto} from "@app/dtos/order";
import {AxiosResponse} from "axios";
import {InitiateCatalogProductsHeadersDto} from "@app/dtos/catalog-products/initiate-catalog-product-headers.dto";
import {CatalogsProductsResponseDto} from "@app/dtos/catalog-products/catalogs-product-response.dto";

@Injectable()
export class CatalogProductsService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private authService: AuthService,
    ) {}

    private readonly logger = new Logger(CatalogProductsService.name);

    async _preparePaypalRequestHeaders(customHeaders?: any) {
        const initiateTokenResponse = await this.authService.getAccessToken();
        const { access_token } = initiateTokenResponse;
        this.logger.log(`access_token :: ${access_token}`)
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': access_token ? `Bearer ${access_token}` : `Basic ${this.authService.getBasicKey()}`,
            ...customHeaders
        };
    }

    async createCatalogProducts(orderPayload: CreatePaypalOrderDto, headers?: InitiateCatalogProductsHeadersDto): Promise<PaypalOrderDto> {
        const _headers = await this._preparePaypalRequestHeaders(headers);
        const environment = this.configService.get("PAYPAL_ENVIRONMENT");
        const apiUrl = this.configService.getApiUrl(environment);
        return await firstValueFrom(
            this.httpService.post(`${apiUrl}/v1/catalogs/products`, orderPayload, {
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


    async getProductions(): Promise<CatalogsProductsResponseDto> {
        const headers = await this._preparePaypalRequestHeaders();
        const environment = this.configService.get("PAYPAL_ENVIRONMENT");
        const apiUrl = this.configService.getApiUrl(environment);
        return await lastValueFrom(
            this.httpService.get(
                `${apiUrl}/v1/catalogs/products`,
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
