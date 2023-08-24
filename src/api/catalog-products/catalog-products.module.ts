import {Module} from '@nestjs/common';
import {ConfigModule} from "@app/config";
import {HttpModule} from "@nestjs/axios";
import {AuthModule} from "@app/api/auth/auth.module";
import {CatalogProductsService} from "@app/api/catalog-products/catalog-products.service";
import {CatalogProductsController} from "@app/api/catalog-products/catalog-products.controller";

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
