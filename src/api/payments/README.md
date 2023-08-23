
## Payments

```bash

Call the Payments API to authorize payments, capture authorized payments, refund payments that have already been captured, and show payment information. 
Use the Payments API in conjunction with the Orders API. 
For more information, see the PayPal Checkout Overview.

```

## Show details for authorized payment
```bash
GET https://api-m.paypal.com/v2/payments/authorizations/{authorization_id}

> Request samples

fetch('https://api-m.sandbox.paypal.com/v2/payments/authorizations/0VF52814937998046', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer A21AAFs9YK9gWL6Vl6AqeoPtm-nf6JmtPOwAc8kfzHVdeigPEhrOJLCvbeIt3fJ4NKvyZo_iWic7sC3RIQrVUdu7igagcuMVQ'
    }
});

> Response samples

{
  "id": "0VF52814937998046",
  "status": "CREATED",
  "amount": {
    "value": "10.99",
    "currency_code": "USD"
  },
  "invoice_id": "INVOICE-123",
  "seller_protection": {
    "status": "ELIGIBLE",
    "dispute_categories": [
      "ITEM_NOT_RECEIVED",
      "UNAUTHORIZED_TRANSACTION"
    ]
  },
  "payee": {
    "email_address": "merchant@example.com",
    "merchant_id": "7KNGBPH2U58GQ"
  },
  "expiration_time": "2017-10-10T23:23:45Z",
  "create_time": "2017-09-11T23:23:45Z",
  "update_time": "2017-09-11T23:23:45Z",
  "links": [
    {
      "rel": "self",
      "method": "GET",
      "href": "https://api-m.paypal.com/v2/payments/authorizations/0VF52814937998046"
    },
    {
      "rel": "capture",
      "method": "POST",
      "href": "https://api-m.paypal.com/v2/payments/authorizations/0VF52814937998046/capture"
    },
    {
      "rel": "void",
      "method": "POST",
      "href": "https://api-m.paypal.com/v2/payments/authorizations/0VF52814937998046/void"
    },
    {
      "rel": "reauthorize",
      "method": "POST",
      "href": "https://api-m.paypal.com/v2/payments/authorizations/0VF52814937998046/reauthorize"
    }
  ]
}

```
