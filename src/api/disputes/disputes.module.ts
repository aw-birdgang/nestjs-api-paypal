import { Module } from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "../../config";
import {AuthModule} from "../auth/auth.module";
import {DisputesController} from "./disputes.controller";
import {DisputesService} from "./disputes.service";

@Module({
    imports: [
        ConfigModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        AuthModule,
    ],
    controllers: [DisputesController],
    providers: [DisputesService],
    exports: [DisputesService],
})
export class DisputesModule {}
