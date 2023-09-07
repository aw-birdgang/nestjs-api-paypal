import {HttpStatus, Injectable, Logger} from '@nestjs/common';
import {AuthService} from "../auth/auth.service";
import {ConfigService} from "../../config";
import {HttpService} from "@nestjs/axios";
import {catchError, firstValueFrom, lastValueFrom, map, Observable} from "rxjs";
import {AxiosError, AxiosResponse} from "axios";
import {CreatePaypalOrderDto, InitiateOrderHeadersDto, PaypalOrderDto} from "../../dtos";
import {ConfirmPaypalOrderDto} from "../../dtos/order/confirm-paypal-order.dto";
import {UpdatePaypalOrderDto} from "../../dtos/order";

@Injectable()
export class OrdersService {

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private authService: AuthService,
    ) {}

    private readonly logger = new Logger(OrdersService.name);

    async _preparePaypalRequestHeaders(customHeaders?: any) {
        const initiateTokenResponse = await this.authService.getAccessToken();
        const { access_token, scope } = initiateTokenResponse;
        this.logger.log(`access_token :: ${access_token}`);
        this.logger.log(`scope :: ${scope}`)
        return {
            'Content-Type': 'application/json',
            'Authorization': access_token ? `Bearer ${access_token}` : `Basic ${this.authService.getBasicKey()}`,
            ...customHeaders
        };
    }

    async initiateOrder(orderPayload: CreatePaypalOrderDto, headers?: InitiateOrderHeadersDto): Promise<PaypalOrderDto> {
        const _headers = await this._preparePaypalRequestHeaders(headers);
        const environment = this.configService.get("PAYPAL_ENVIRONMENT");
        const apiUrl = this.configService.getApiUrl(environment);
        return await firstValueFrom(
            this.httpService.post(`${apiUrl}/v2/checkout/orders`, orderPayload, {
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

    async updateOrder(orderId: string, updateOrderDto: UpdatePaypalOrderDto[]): Promise<PaypalOrderDto> {
        const _headers = await this._preparePaypalRequestHeaders();
        const environment = this.configService.get("PAYPAL_ENVIRONMENT");
        const apiUrl = this.configService.getApiUrl(environment);
        this.logger.log(`updateOrder >> orderId :: ${orderId}`)

        return await firstValueFrom(
            this.httpService.post(`${apiUrl}/v2/checkout/orders/${orderId}`, updateOrderDto,{
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


    findOrderById(baseUrl: string, orderId: string): Observable<AxiosResponse<PaypalOrderDto>> {
        return this.httpService.get(`${baseUrl}/v2/checkout/orders/${orderId}`,);
    }

    async getOrderDetails(orderId: string): Promise<PaypalOrderDto | void> {
        const headers = await this._preparePaypalRequestHeaders();
        const environment = this.configService.get("PAYPAL_ENVIRONMENT");
        const apiUrl = this.configService.getApiUrl(environment);
        this.logger.log(`request url :: ${apiUrl}/v2/checkout/orders/${orderId}`);
        //
        const result = await lastValueFrom(
            this.httpService.get(
                `${apiUrl}/v2/checkout/orders/${orderId}`,
                {
                    headers
                }
            ).pipe(
                map((response) => {
                    return response.data;
                }),
            )
        );
        this.logger.log("result.status :: " + result.status);
        return result;
    }


    async confirmOrder(orderId: string, payload: ConfirmPaypalOrderDto): Promise<PaypalOrderDto | void> {
        const headers = await this._preparePaypalRequestHeaders();
        const environment = this.configService.get("PAYPAL_ENVIRONMENT");
        const apiUrl = this.configService.getApiUrl(environment);
        orderId = "6VW70343A65796208";

        const requestUrl = `${apiUrl}/v2/checkout/orders/${orderId}`;
        this.logger.log(`request url :: ${requestUrl}`);
        //
        const result = await lastValueFrom(
            this.httpService.post(requestUrl, payload, { headers }).pipe(
                map((response) => {
                    return response.data;
                }),
            )
        );
        this.logger.log("result.status :: " + result.status);
        return result;
    }


    // //
    // // async authorizePaymentForOrder(orderId: string, payload: PaymentSourceResponseDto, headers?: AuthorizeOrderHeadersDto): Promise<axios.AxiosResponse<PaypalOrderDto> | void> {
    // //     const _headers = await this._preparePaypalRequestHeaders(headers);
    // //     const apiUrl = this.configService.getApiUrl(this.options.environment);
    // //
    // //     return this.axiosInstance.post(`${apiUrl}/v2/checkout/orders/${orderId}/authorize`, payload, {
    // //         headers: _headers
    // //     })
    // //     .then(r => r.data)
    // //     .catch(e => {
    // //         throw {
    // //             ...PaypalErrorsConstants.AUTHORIZE_ORDER_FAILED,
    // //             nativeError: e?.response?.data || e
    // //         }
    // //     })
    // // }
    // //
    // // async capturePaymentForOrder(orderId: string, payload: PaymentSourceResponseDto, headers?: AuthorizeOrderHeadersDto): Promise<axios.AxiosResponse<PaypalOrderDto> | void> {
    // //     const _headers = await this._preparePaypalRequestHeaders(headers);
    // //     const apiUrl = this.configService.getApiUrl(this.options.environment);
    // //     return this.axiosInstance.post(`${apiUrl}/v2/checkout/orders/${orderId}/capture`, payload, {
    // //         headers: _headers
    // //     })
    // //     .then(r => r.data)
    // //     .catch(e => {
    // //         throw {
    // //             ...PaypalErrorsConstants.CAPTURE_ORDER_FAILED,
    // //             nativeError: e?.response?.data || e
    // //         }
    // //     })
    // // }
}
