import { Module } from '@nestjs/common';
import {ConfigModule} from "@app/config";
import {HttpModule} from "@nestjs/axios";
import {AuthModule} from "@app/api/auth/auth.module";
import {InvoicesService} from "@app/api/invoices/invoices.service";
import {InvoicesController} from "@app/api/invoices/invoices.controller";

@Module({
    imports: [
        ConfigModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        AuthModule,
    ],
    controllers: [InvoicesController],
    providers: [InvoicesService],
    exports: [InvoicesService],
})
export class InvoicesModule {}
