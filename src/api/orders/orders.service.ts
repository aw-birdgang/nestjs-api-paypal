import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {
    PAYPAL_AUTHORIZATION_HEADERS,
    PAYPAL_AUTHORIZATION_SERVICE_INSTANCE_TOKEN,
    PAYPAL_AXIOS_INSTANCE_TOKEN,
    PAYPAL_MODULE_OPTIONS, PAYPAL_UTILS_SERVICE_INSTANCE_TOKEN
} from "../../constants";
import {PaypalModuleOptions} from "../../interfaces";
import {AuthService} from "../auth/auth.service";
import {PaypalErrorsConstants} from "../../errors";
import {ConfigService} from "../../config";
import {AuthorizeOrderHeadersDto, CreatePaypalOrderDto, InitiateOrderHeadersDto, PaypalOrderDto} from "@app/dtos";
import {UpdatePaypalOrderDto} from "@app/dtos/order";
import {PaymentSourceResponseDto} from "@app/dtos/payment-source-response.dto";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom, map} from "rxjs";

@Injectable()
export class OrdersService {

    constructor(
        // @Inject(PAYPAL_AXIOS_INSTANCE_TOKEN) private readonly axiosInstance: AxiosInstance,
        @Inject(PAYPAL_MODULE_OPTIONS) private readonly options: PaypalModuleOptions,
        @Inject(PAYPAL_AUTHORIZATION_SERVICE_INSTANCE_TOKEN) private authService: AuthService,
        @Inject(PAYPAL_UTILS_SERVICE_INSTANCE_TOKEN) private configService: ConfigService,
        @Inject(PAYPAL_AXIOS_INSTANCE_TOKEN) private readonly httpService: HttpService
    ) {}

    // async _preparePaypalRequestHeaders(customHeaders?: any) {
    //     const initiateTokenResponse = await this.authService.getAccessToken();
    //     const { access_token } = initiateTokenResponse;
    //     return {
    //         'Content-Type': 'application/json',
    //         'Authorization': access_token ? `Bearer ${access_token}` : `Basic ${this.authService.getBasicKey()}`,
    //         ...customHeaders
    //     };
    // }
    //
    // async initiateOrder(orderPayload: CreatePaypalOrderDto, headers?: InitiateOrderHeadersDto): Promise<PaypalOrderDto> {
    //     const _headers = await this._preparePaypalRequestHeaders(headers);
    //     const apiUrl = this.configService.getApiUrl(this.options.environment);
    //
    //     const { errors, result } = firstValueFrom(
    //         this.httpService.post(`${apiUrl}/v2/checkout/orders`, orderPayload, {
    //             headers: _headers
    //         })
    //         .pipe(
    //             map((response) => {
    //                     return response.data;
    //                 }
    //             )
    //         )
    //     );
    //     if (errors) {
    //         throw {
    //             ...PaypalErrorsConstants.INITIATE_ORDER_FAILED,
    //             nativeError: errors?.response?.data || errors
    //         }
    //     }
    //
    //     return result.data;
    // }
    //
    //
    // // async initiateOrder(orderPayload: CreatePaypalOrderDto, headers?: InitiateOrderHeadersDto): Promise<PaypalOrderDto> {
    // // // async initiateOrder(orderPayload: CreatePaypalOrderDto, headers?: InitiateOrderHeadersDto): Promise<axios.AxiosResponse<PaypalOrderDto> | void> {
    // //     const _headers = await this._preparePaypalRequestHeaders(headers);
    // //     const apiUrl = this.configService.getApiUrl(this.options.environment);
    // //
    // //     return this.axiosInstance.post(`${apiUrl}/v2/checkout/orders`, orderPayload, {
    // //         headers: _headers
    // //     })
    // //     .then(r => r.data)
    // //     .catch(e => {
    // //         throw {
    // //             ...PaypalErrorsConstants.INITIATE_ORDER_FAILED,
    // //             nativeError: e?.response?.data || e
    // //         }
    // //     });
    // // }
    //
    // // async updateOrder(orderId: string, updateOrderDto: UpdatePaypalOrderDto[]): Promise<axios.AxiosResponse<any> | void> {
    // //     const _headers = await this._preparePaypalRequestHeaders();
    // //     const apiUrl = this.configService.getApiUrl(this.options.environment);
    // //     return this.axiosInstance.patch(`${apiUrl}/v2/checkout/orders/${orderId}`, updateOrderDto, {
    // //         headers: _headers
    // //     }).then(r => {
    // //         if(r.status === 204) {
    // //             return {
    // //                 message: `Order updated successfully.!`
    // //             }
    // //         }
    // //         return r.data;
    // //     }).catch(e => {
    // //         throw {
    // //             ...PaypalErrorsConstants.UPDATE_ORDER_FAILED,
    // //             nativeError: e?.response?.data || e
    // //         }
    // //     })
    // // }
    // //
    // // async getOrderDetails(orderId: string): Promise<axios.AxiosResponse<PaypalOrderDto> | void> {
    // //     const headers = await this._preparePaypalRequestHeaders();
    // //     const apiUrl = this.configService.getApiUrl(this.options.environment);
    // //     return this.axiosInstance.get(
    // //         `${apiUrl}/v2/checkout/orders/${orderId}`,
    // //         {
    // //             headers
    // //         }
    // //     ).then(r => {
    // //         if(r.status === 200) {
    // //             return r.data;
    // //         }
    // //         throw {
    // //             message: 'Un-expected error',
    // //             data: r.data
    // //         }
    // //     }).catch(e => {
    // //         throw {
    // //             ...PaypalErrorsConstants.GET_ORDER_FAILED,
    // //             nativeError: e?.response?.data || e
    // //         }
    // //     })
    // // }
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
