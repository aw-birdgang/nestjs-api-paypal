export class ConfirmPaypalOrderDto {
  payment_source?: PaymentSource;
}

export class PaymentSource {
  paypal?: Paypal;
}

export class Paypal {
  name?: Name;
  email_address?: string;
  experience_context?: ExperienceContext;
}

export class Name {
  given_name?: string;
  surname?: string;
}


export class ExperienceContext {
  payment_method_preference?: string;
  brand_name?: string;
  locale?: string;
  landing_page?: string;
  shipping_preference?: string;
  user_action?: string;
  return_url?: string;
  cancel_url?: string;
}

// {
//   "payment_source": {
//   "paypal": {
//     "name": {
//       "given_name": "John",
//           "surname": "Doe"
//     },
//     "email_address": "customer@example.com",
//         "experience_context": {
//       "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
//           "brand_name": "EXAMPLE INC",
//           "locale": "en-US",
//           "landing_page": "LOGIN",
//           "shipping_preference": "SET_PROVIDED_ADDRESS",
//           "user_action": "PAY_NOW",
//           "return_url": "https://example.com/returnUrl",
//           "cancel_url": "https://example.com/cancelUrl"
//     }
//   }
// }
// };
