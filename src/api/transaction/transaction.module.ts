import {Module} from '@nestjs/common';
import {ConfigModule} from "@app/config";
import {HttpModule} from "@nestjs/axios";
import {AuthModule} from "@app/api/auth/auth.module";
import {TransactionService} from "@app/api/transaction/transaction.service";
import {TransactionController} from "@app/api/transaction/transaction.controller";

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
