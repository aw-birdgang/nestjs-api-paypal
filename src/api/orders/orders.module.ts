import { Module } from '@nestjs/common';
import {ConfigModule} from "../../config";
import {OrdersController} from "./orders.controller";
import {OrdersService} from "./orders.service";
import {AuthModule} from "../auth/auth.module";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        AuthModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService],
})
export class OrdersModule {}
