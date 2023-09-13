import { Module } from '@nestjs/common';
import {ConfigModule} from "../../config";
import {HttpModule} from "@nestjs/axios";
import {AuthModule} from "../auth/auth.module";
import {AddTrackingService} from "./add-tracking.service";
import {AddTrackingController} from "./add-tracking.controller";

@Module({
    imports: [
        ConfigModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        AuthModule,
    ],
    controllers: [AddTrackingController],
    providers: [AddTrackingService],
    exports: [AddTrackingService],
})
export class AddTrackingModule {}
