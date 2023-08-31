import {BillingCycleDto} from "@app/dtos/subscriptions/billing_cycle.dto";
import {PaymentPreferences} from "@app/dtos/subscriptions/payment_preferences.dto";

export class CreatePlansDto {
  product_id?: string;
  name?: string;
  billing_cycles?: BillingCycleDto[];
  payment_preferences?: PaymentPreferences;
}
