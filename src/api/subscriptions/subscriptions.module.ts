import { Module } from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "../../config";
import {AuthModule} from "../auth/auth.module";
import {SubscriptionsController} from "./subscriptions.controller";
import {SubscriptionsService} from "./subscriptions.service";

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
