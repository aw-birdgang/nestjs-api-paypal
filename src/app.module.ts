import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { OrdersModule } from './api/orders/orders.module';
import { TransactionModule } from './api/transaction/transaction.module';
import { PaymentsModule } from './api/payments/payments.module';
import { CatalogProductsModule } from './api/catalog-products/catalog-products.module';
import { DisputesModule } from './api/disputes/disputes.module';
import { InvoicesModule } from './api/invoices/invoices.module';
import { PayoutsModule } from './api/payouts/payouts.module';
import { SubscriptionsController } from './api/subscriptions/subscriptions.controller';
import { SubscriptionsService } from './api/subscriptions/subscriptions.service';
import { SubscriptionsModule } from './api/subscriptions/subscriptions.module';

@Module({
  imports: [
    AuthModule,
    OrdersModule,
    TransactionModule,
    PaymentsModule,
    CatalogProductsModule,
    DisputesModule,
    InvoicesModule,
    PayoutsModule,
    SubscriptionsModule,
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class AppModule {}
