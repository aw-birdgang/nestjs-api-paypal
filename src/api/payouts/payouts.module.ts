import {Module} from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "../../config";
import {AuthModule} from "../auth/auth.module";
import {PayoutsController} from "./payouts.controller";
import {PayoutsService} from "./payouts.service";

@Module({
    imports: [
        ConfigModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        AuthModule,
    ],
    controllers: [PayoutsController],
    providers: [PayoutsService],
    exports: [PayoutsService],
})
export class PayoutsModule {}
