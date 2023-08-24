
## Payments

```bash

Merchants can use the Catalog Products API to create products, which are goods and services.

https://developer.paypal.com/docs/api/catalog-products/v1/
```

## Create order
```bash
POST https://api-m.paypal.com/v2/checkout/orders

> Request samples

var fetch = require('node-fetch');

fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a',
        'Authorization': 'Bearer 6V7rbVwmlM1gFZKW_8QtzWXqpcwQ6T5vhEGYNJDAAdn3paCgRpdeMdVYmWzgbKSsECednupJ3Zx5Xd-g'
    },
    body: JSON.stringify({ "intent": "CAPTURE", "purchase_units": [ { "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b", "amount": { "currency_code": "USD", "value": "100.00" } } ], "payment_source": { "paypal": { "experience_context": { "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED", "brand_name": "EXAMPLE INC", "locale": "en-US", "landing_page": "LOGIN", "shipping_preference": "SET_PROVIDED_ADDRESS", "user_action": "PAY_NOW", "return_url": "https://example.com/returnUrl", "cancel_url": "https://example.com/cancelUrl" } } } })
});


> Response samples

{
  "id": "5O190127TN364715T",
  "status": "PAYER_ACTION_REQUIRED",
  "payment_source": {
    "paypal": {}
  },
  "links": [
    {
      "href": "https://api-m.paypal.com/v2/checkout/orders/5O190127TN364715T",
      "rel": "self",
      "method": "GET"
    },
    {
      "href": "https://www.paypal.com/checkoutnow?token=5O190127TN364715T",
      "rel": "payer-action",
      "method": "GET"
    }
  ]
}

```


## Show order details
```bash
POST https://api-m.paypal.com/v1/catalogs/products

> Request samples

var fetch = require('node-fetch');

fetch('https://api-m.sandbox.paypal.com/v1/catalogs/products', {
    method: 'POST',
    headers: {
        'X-PAYPAL-SECURITY-CONTEXT': '{"consumer":{"accountNumber":1181198218909172527,"merchantId":"5KW8F2FXKX5HA"},"merchant":{"accountNumber":1659371090107732880,"merchantId":"2J6QB8YJQSJRJ"},"apiCaller":{"clientId":"AdtlNBDhgmQWi2xk6edqJVKklPFyDWxtyKuXuyVT-OgdnnKpAVsbKHgvqHHP","appId":"APP-6DV794347V142302B","payerId":"2J6QB8YJQSJRJ","accountNumber":"1659371090107732880"},"scopes":["https://api-m.paypal.com/v1/subscription/.*","https://uri.paypal.com/services/subscription","openid"]}',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'PayPal-Request-Id': 'PRODUCT-18062019-001',
        'Prefer': 'return=representation'
    },
    body: JSON.stringify(
      { 
        "name": "Video Streaming Service", 
        "description": "Video streaming service", 
        "type": "SERVICE", 
        "category": "SOFTWARE", 
        "image_url": "https://example.com/streaming.jpg", 
        "home_url": "https://example.com/home" 
      }
    )
});


> Response samples

{
  "id": "PROD-XYAB12ABSB7868434",
  "name": "Video Streaming Service",
  "description": "Video streaming service",
  "type": "SERVICE",
  "category": "SOFTWARE",
  "image_url": "https://example.com/streaming.jpg",
  "home_url": "https://example.com/home",
  "create_time": "2019-01-10T21:20:49Z",
  "update_time": "2019-01-10T21:20:49Z",
  "links": [
    {
      "href": "https://api-m.paypal.com/v1/catalogs/products/72255d4849af8ed6e0df1173",
      "rel": "self",
      "method": "GET"
    },
    {
      "href": "https://api-m.paypal.com/v1/catalogs/products/72255d4849af8ed6e0df1173",
      "rel": "edit",
      "method": "PATCH"
    }
  ]
}
```
