import {Inject, Injectable, Logger} from '@nestjs/common';

import {PAYPAL_AUTHORIZATION_HEADERS, PAYPAL_AXIOS_INSTANCE_TOKEN, PAYPAL_MODULE_OPTIONS} from "../../constants";
import {PaypalModuleOptions} from "../../interfaces";
import {InitiateTokenResponseDto} from "../../dtos";
import {PaypalErrorsConstants} from "../../errors";
import {catchError, firstValueFrom, lastValueFrom, map} from 'rxjs';
import {HttpService} from "@nestjs/axios";
import {AxiosInstance} from "axios";

@Injectable()
export class AuthService {
    constructor(
        @Inject(PAYPAL_AXIOS_INSTANCE_TOKEN) private readonly axiosInstance: AxiosInstance,
        @Inject(PAYPAL_MODULE_OPTIONS) private readonly options: PaypalModuleOptions,
        @Inject(PAYPAL_AXIOS_INSTANCE_TOKEN) private readonly httpService: HttpService,
    ) {
    }

    private readonly logger = new Logger(AuthService.name);

    getBasicKey() {
        return Buffer.from(this.options.clientId + ':' + this.options.clientSecret).toString('base64');
    }

    // async getAccessToken(): Promise<InitiateTokenResponseDto> {
    //     const url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';
    //     const basicKey = this.getBasicKey();
    //     const data = new URLSearchParams();
    //     data.append('grant_type' , 'client_credentials');
    //
    //     // const { result } = firstValueFrom(
    //     //     this.httpService.post(url, data, {
    //     //         headers: {
    //     //             ...PAYPAL_AUTHORIZATION_HEADERS,
    //     //             Authorization: `Basic ${basicKey}`
    //     //         }
    //     //     })
    //     //     .pipe(
    //     //         map((response) => {
    //     //             return response.data;
    //     //         }
    //     //     ))
    //     // );
    //
    //     // return result;
    //     // return this.httpService.post(
    //     //     url,
    //     //     data,
    //     //     {
    //     //         headers: {
    //     //             ...PAYPAL_AUTHORIZATION_HEADERS,
    //     //             Authorization: `Basic ${basicKey}`
    //     //         }
    //     //     }
    //     // ).then(r => r.data)
    //     //     .catch(e => {
    //     //         throw {
    //     //             ...PaypalErrorsConstants.INVALID_CREDENTIALS,
    //     //             nativeError: e?.response?.data || e
    //     //         }
    //     //     });
    // }


}
