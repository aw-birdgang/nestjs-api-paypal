import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { OrdersModule } from './api/orders/orders.module';
import { TransactionModule } from './api/transaction/transaction.module';
import { PaymentsModule } from './api/payments/payments.module';

@Module({
  imports: [
    AuthModule,
    OrdersModule,
    TransactionModule,
    PaymentsModule,
  ],
})
export class AppModule {}
