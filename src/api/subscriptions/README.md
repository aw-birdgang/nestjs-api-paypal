
## Payouts

```bash

You can use billing plans and subscriptions to create subscriptions that process recurring PayPal payments for physical or digital goods, or services. 
A plan includes pricing and billing cycle information that defines the amount and frequency of charge for a subscription. 
You can also define a fixed plan, such as a $5 basic plan or a volume- or graduated-based plan with pricing tiers based on the quantity purchased. 
For more information, see Subscriptions Overview.

```



## Create plan
```bash

Creates a plan that defines pricing and billing cycle details for subscriptions.

POST https://api-m.paypal.com/v1/billing/plans


var fetch = require('node-fetch');

fetch('https://api-m.sandbox.paypal.com/v1/billing/plans', {
    method: 'POST',
    headers: {
        'X-PAYPAL-SECURITY-CONTEXT': '{"consumer":{"accountNumber":1181198218909172527,"merchantId":"5KW8F2FXKX5HA"},"merchant":{"accountNumber":1659371090107732880,"merchantId":"2J6QB8YJQSJRJ"},"apiCaller":{"clientId":"AdtlNBDhgmQWi2xk6edqJVKklPFyDWxtyKuXuyVT-OgdnnKpAVsbKHgvqHHP","appId":"APP-6DV794347V142302B","payerId":"2J6QB8YJQSJRJ","accountNumber":"1659371090107732880"},"scopes":["https://api-m.paypal.com/v1/subscription/.*","https://uri.paypal.com/services/subscription","openid"]}',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'PayPal-Request-Id': 'PLAN-18062019-001',
        'Prefer': 'return=representation'
    },
    body: JSON.stringify({ "product_id": "PROD-XXCD1234QWER65782", "name": "Video Streaming Service Plan", "description": "Video Streaming Service basic plan", "status": "ACTIVE", "billing_cycles": [ { "frequency": { "interval_unit": "MONTH", "interval_count": 1 }, "tenure_type": "TRIAL", "sequence": 1, "total_cycles": 2, "pricing_scheme": { "fixed_price": { "value": "3", "currency_code": "USD" } } }, { "frequency": { "interval_unit": "MONTH", "interval_count": 1 }, "tenure_type": "TRIAL", "sequence": 2, "total_cycles": 3, "pricing_scheme": { "fixed_price": { "value": "6", "currency_code": "USD" } } }, { "frequency": { "interval_unit": "MONTH", "interval_count": 1 }, "tenure_type": "REGULAR", "sequence": 3, "total_cycles": 12, "pricing_scheme": { "fixed_price": { "value": "10", "currency_code": "USD" } } } ], "payment_preferences": { "auto_bill_outstanding": true, "setup_fee": { "value": "10", "currency_code": "USD" }, "setup_fee_failure_action": "CONTINUE", "payment_failure_threshold": 3 }, "taxes": { "percentage": "10", "inclusive": false } })
});


{
  "id": "P-5ML4271244454362WXNWU5NQ",
  "product_id": "PROD-XXCD1234QWER65782",
  "name": "Video Streaming Service Plan",
  "description": "Video Streaming Service basic plan",
  "status": "ACTIVE",
  "billing_cycles": [
    {
      "frequency": {
        "interval_unit": "MONTH",
        "interval_count": 1
      },
      "tenure_type": "TRIAL",
      "sequence": 1,
      "total_cycles": 2,
      "pricing_scheme": {
        "fixed_price": {
          "value": "3",
          "currency_code": "USD"
        },
        "version": 1,
        "create_time": "2020-05-27T12:13:51Z",
        "update_time": "2020-05-27T12:13:51Z"
      }
    },
    {
      "frequency": {
        "interval_unit": "MONTH",
        "interval_count": 1
      },
      "tenure_type": "TRIAL",
      "sequence": 2,
      "total_cycles": 3,
      "pricing_scheme": {
        "fixed_price": {
          "currency_code": "USD",
          "value": "6"
        },
        "version": 1,
        "create_time": "2020-05-27T12:13:51Z",
        "update_time": "2020-05-27T12:13:51Z"
      }
    },
    {
      "frequency": {
        "interval_unit": "MONTH",
        "interval_count": 1
      },
      "tenure_type": "REGULAR",
      "sequence": 3,
      "total_cycles": 12,
      "pricing_scheme": {
        "fixed_price": {
          "currency_code": "USD",
          "value": "10"
        },
        "version": 1,
        "create_time": "2020-05-27T12:13:51Z",
        "update_time": "2020-05-27T12:13:51Z"
      }
    }
  ],
  "payment_preferences": {
    "auto_bill_outstanding": true,
    "setup_fee": {
      "value": "10",
      "currency_code": "USD"
    },
    "setup_fee_failure_action": "CONTINUE",
    "payment_failure_threshold": 3
  },
  "taxes": {
    "percentage": "10",
    "inclusive": false
  },
  "create_time": "2020-05-27T12:13:51Z",
  "update_time": "2020-05-27T12:13:51Z",
  "links": [
    {
      "href": "https://api-m.paypal.com/v1/billing/plans/P-5ML4271244454362WXNWU5NQ",
      "rel": "self",
      "method": "GET"
    },
    {
      "href": "https://api-m.paypal.com/v1/billing/plans/P-5ML4271244454362WXNWU5NQ",
      "rel": "edit",
      "method": "PATCH"
    },
    {
      "href": "https://api-m.paypal.com/v1/billing/plans/P-5ML4271244454362WXNWU5NQ/deactivate",
      "rel": "deactivate",
      "method": "POST"
    },
    {
      "href": "https://api-m.paypal.com/v1/billing/plans/P-5ML4271244454362WXNWU5NQ/update-pricing-schemes",
      "rel": "edit",
      "method": "POST"
    }
  ]
}


```
