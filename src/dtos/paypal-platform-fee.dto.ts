import {PaypalMoneyDto} from "./paypal-money.dto";
import {PaypalPayeeBaseDto} from "./paypal-payee.dto";

export class PaypalPlatformFeeDto {
  amount: PaypalMoneyDto;
  payee: PaypalPayeeBaseDto;
}
