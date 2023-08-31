import { Module } from '@nestjs/common';
import {ConfigModule} from "@app/config";
import {HttpModule} from "@nestjs/axios";
import {AuthModule} from "@app/api/auth/auth.module";
import {SubscriptionsService} from "@app/api/subscriptions/subscriptions.service";
import {SubscriptionsController} from "@app/api/subscriptions/subscriptions.controller";

@Module({
    imports: [
        ConfigModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        AuthModule,
    ],
    controllers: [SubscriptionsController],
    providers: [SubscriptionsService],
    exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
