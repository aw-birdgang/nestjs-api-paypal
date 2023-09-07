import {BillingCycleDto} from "./billing_cycle.dto";
import {PaymentPreferences} from "./payment_preferences.dto";

export class CreatePlansDto {
  product_id?: string;
  name?: string;
  billing_cycles?: BillingCycleDto[];
  payment_preferences?: PaymentPreferences;
}
