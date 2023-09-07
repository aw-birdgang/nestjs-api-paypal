import {Module} from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "../../config";
import {AuthModule} from "../auth/auth.module";
import {CatalogProductsController} from "./catalog-products.controller";
import {CatalogProductsService} from "./catalog-products.service";

@Module({
    imports: [
        ConfigModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        AuthModule,
    ],
    controllers: [CatalogProductsController],
    providers: [CatalogProductsService],
    exports: [CatalogProductsService],
})
export class CatalogProductsModule {}
