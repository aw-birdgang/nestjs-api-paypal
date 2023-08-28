import { Module } from '@nestjs/common';
import {ConfigModule} from "@app/config";
import {HttpModule} from "@nestjs/axios";
import {AuthModule} from "@app/api/auth/auth.module";
import {DisputesController} from "@app/api/disputes/disputes.controller";
import {DisputesService} from "@app/api/disputes/disputes.service";

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
