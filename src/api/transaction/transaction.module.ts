import {Module} from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {AuthModule} from "../auth/auth.module";
import {ConfigModule} from "../../config";
import {TransactionController} from "./transaction.controller";
import {TransactionService} from "./transaction.service";

@Module({
    imports: [
        ConfigModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        AuthModule,
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
    exports: [TransactionService],
})
export class TransactionModule {}
