import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from "../../config";
import {HttpService} from "@nestjs/axios";
import {AuthService} from "../auth/auth.service";
import {lastValueFrom, map} from "rxjs";
import {AddTrackingResponseDto} from "./dto/add-tracking-response.dto";

@Injectable()
export class AddTrackingService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private authService: AuthService,
    ) {}

    private readonly logger = new Logger(AddTrackingService.name);

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

    //https://api-m.sandbox.paypal.com/v1/shipping/trackers?tracking_number=443844607820&transaction_id=8MC585209K746392H
    async getListTrackingInformation(transactionId: string): Promise<AddTrackingResponseDto> {
        const headers = await this._preparePaypalRequestHeaders();
        const environment = this.configService.get("PAYPAL_ENVIRONMENT");
        const apiUrl = this.configService.getApiUrl(environment);

        // const trackingNumber = 4438446078200;
        // transactionId = "8MC585209K746392H";
        // const path = `tracking_number=${trackingNumber}&transaction_id=${transactionId}`
        const requestUrl = `${apiUrl}/v1/shipping/trackers?` + `transaction_id=${transactionId}`;
        this.logger.log("getListTrackingInformation > requestUrl :: " + requestUrl);

        return await lastValueFrom(
            this.httpService.get(requestUrl, { headers })
            .pipe(
                map(response => response?.data),
            )
        );
    }


}
