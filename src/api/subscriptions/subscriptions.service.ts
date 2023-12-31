import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom, lastValueFrom, map} from "rxjs";
import {ConfigService} from "../../config";
import {AuthService} from "../auth/auth.service";
import {CreatePlansDto} from "../../dtos/subscriptions/create-plans.dto";
import {InitiateSubscriptionsHeadersDto} from "../../dtos/subscriptions/initiate-subscriptions-headers.dto";
import {PayoutsResponseDto} from "../../dtos/payouts/payouts-response.dto";
import {PlansResponseDto} from "../../dtos/subscriptions/plans-response.dto";

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
        const { scope, access_token, token_type, app_id, expires_in, nonce } = initiateTokenResponse;
        this.logger.log(`scope :: ${scope}`);
        this.logger.log(`access_token :: ${access_token}`);
        this.logger.log(`token_type :: ${token_type}`);
        this.logger.log(`app_id :: ${app_id}`);
        this.logger.log(`expires_in :: ${expires_in}`);
        this.logger.log(`nonce :: ${nonce}`);
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
    async createPlan(planPayload: CreatePlansDto, headers?: InitiateSubscriptionsHeadersDto): Promise<PayoutsResponseDto> {
        const _headers = await this._preparePaypalRequestHeaders(headers);
        const environment = this.configService.get("PAYPAL_ENVIRONMENT");
        const apiUrl = this.configService.getApiUrl(environment);
        const requestUrl = `${apiUrl}/v1/billing/plans`;
        this.logger.log(`createPayout > request url :: ` + requestUrl);

        return await firstValueFrom(
            this.httpService.post(requestUrl, planPayload, {
                headers: _headers
            }).pipe(
                map(response => response?.data),
            )
        );
    }


    async getPlans(): Promise<PlansResponseDto> {
        const headers = await this._preparePaypalRequestHeaders();
        const environment = this.configService.get("PAYPAL_ENVIRONMENT");
        const apiUrl = this.configService.getApiUrl(environment);
        //
        const requestUrl = `${apiUrl}/v1/billing/plans`;
        this.logger.log(`getPlans > request url :: ` + requestUrl);

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
