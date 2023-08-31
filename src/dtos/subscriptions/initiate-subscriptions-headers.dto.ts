export class InitiateSubscriptionsHeadersDto {
  'X-PAYPAL-SECURITY-CONTEXT'?: XPaypalSecurityContext;
  'PayPal-Request-Id'?: string;
  'Prefer'?: 'return=minimal' | 'return=representation';
}

export class XPaypalSecurityContext {
  consumer?: Consumer;
  merchant?: Merchant;
  apiCaller?: ApiCaller;
  scopes?: string[]
}

export class Consumer {
  accountNumber?: number;
  merchantId?: string;
}

export class Merchant {
  accountNumber?: number;
  merchantId?: string;
}

export class ApiCaller {
  clientId?: string;
  appId?: string;
  payerId?: string;
  accountNumber?: string;
}


// 'X-PAYPAL-SECURITY-CONTEXT': '{
// "consumer":{
//   "accountNumber":1181198218909172527,
//       "merchantId":"5KW8F2FXKX5HA"
// },
// "merchant":{
//   "accountNumber":1659371090107732880,
//       "merchantId":"2J6QB8YJQSJRJ"
// },
// "apiCaller":{
//   "clientId":"AdtlNBDhgmQWi2xk6edqJVKklPFyDWxtyKuXuyVT-OgdnnKpAVsbKHgvqHHP",
//       "appId":"APP-6DV794347V142302B",
//       "payerId":"2J6QB8YJQSJRJ",
//       "accountNumber":"1659371090107732880"
// },
// "scopes":[
//   "https://api-m.paypal.com/v1/subscription/.*",
//   "https://uri.paypal.com/services/subscription","openid"
// ]
// }',
