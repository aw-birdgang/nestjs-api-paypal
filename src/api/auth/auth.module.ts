import {Module} from '@nestjs/common';
import {ConfigModule} from "../../config";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [
        ConfigModule,
        HttpModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
