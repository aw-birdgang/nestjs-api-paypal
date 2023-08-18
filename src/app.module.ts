import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { OrdersModule } from './api/orders/orders.module';

@Module({
  imports: [
    AuthModule,
    OrdersModule,
  ],
})
export class AppModule {}
