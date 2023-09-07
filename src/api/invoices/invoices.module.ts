import { Module } from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "../../config";
import {AuthModule} from "../auth/auth.module";
import {InvoicesController} from "./invoices.controller";
import {InvoicesService} from "./invoices.service";

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
