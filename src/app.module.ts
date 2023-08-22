import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { OrdersModule } from './api/orders/orders.module';
import { TransactionModule } from './api/transaction/transaction.module';

@Module({
  imports: [
    AuthModule,
    OrdersModule,
    TransactionModule,
  ],
})
export class AppModule {}
