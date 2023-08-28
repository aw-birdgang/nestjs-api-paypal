
## Invoices

```bash

Use the Invoicing API to create, send, and manage invoices. 
You can also use the API or webhooks to track invoice payments. 
When you send an invoice to a customer, the invoice moves from draft to payable state. PayPal then emails the customer a link to the invoice on the PayPal website. Customers with a PayPal account can log in and pay the invoice with PayPal. Alternatively, customers can pay as a guest with a debit card or credit card. For more information, see the Invoicing Overview and the Invoicing Integration Guide.

```



## Create order
```bash
var fetch = require('node-fetch');

fetch('https://api-m.sandbox.paypal.com/v2/invoicing/invoices', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer zekwhYgsYYI0zDg0p_Nf5v78VelCfYR0',
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    },
    body: JSON.stringify({ "detail": { "invoice_number": "#123", "reference": "deal-ref", "invoice_date": "2018-11-12", "currency_code": "USD", "note": "Thank you for your business.", "term": "No refunds after 30 days.", "memo": "This is a long contract", "payment_term": { "term_type": "NET_10", "due_date": "2018-11-22" } }, "invoicer": { "name": { "given_name": "David", "surname": "Larusso" }, "address": { "address_line_1": "1234 First Street", "address_line_2": "337673 Hillside Court", "admin_area_2": "Anytown", "admin_area_1": "CA", "postal_code": "98765", "country_code": "US" }, "email_address": "merchant@example.com", "phones": [ { "country_code": "001", "national_number": "4085551234", "phone_type": "MOBILE" } ], "website": "www.test.com", "tax_id": "ABcNkWSfb5ICTt73nD3QON1fnnpgNKBy- Jb5SeuGj185MNNw6g", "logo_url": "https://example.com/logo.PNG", "additional_notes": "2-4" }, "primary_recipients": [ { "billing_info": { "name": { "given_name": "Stephanie", "surname": "Meyers" }, "address": { "address_line_1": "1234 Main Street", "admin_area_2": "Anytown", "admin_area_1": "CA", "postal_code": "98765", "country_code": "US" }, "email_address": "bill-me@example.com", "phones": [ { "country_code": "001", "national_number": "4884551234", "phone_type": "HOME" } ], "additional_info_value": "add-info" }, "shipping_info": { "name": { "given_name": "Stephanie", "surname": "Meyers" }, "address": { "address_line_1": "1234 Main Street", "admin_area_2": "Anytown", "admin_area_1": "CA", "postal_code": "98765", "country_code": "US" } } } ], "items": [ { "name": "Yoga Mat", "description": "Elastic mat to practice yoga.", "quantity": "1", "unit_amount": { "currency_code": "USD", "value": "50.00" }, "tax": { "name": "Sales Tax", "percent": "7.25" }, "discount": { "percent": "5" }, "unit_of_measure": "QUANTITY" }, { "name": "Yoga t-shirt", "quantity": "1", "unit_amount": { "currency_code": "USD", "value": "10.00" }, "tax": { "name": "Sales Tax", "percent": "7.25" }, "discount": { "amount": { "currency_code": "USD", "value": "5.00" } }, "unit_of_measure": "QUANTITY" } ], "configuration": { "partial_payment": { "allow_partial_payment": true, "minimum_amount_due": { "currency_code": "USD", "value": "20.00" } }, "allow_tip": true, "tax_calculated_after_discount": true, "tax_inclusive": false, "template_id": "TEMP-19V05281TU309413B" }, "amount": { "breakdown": { "custom": { "label": "Packing Charges", "amount": { "currency_code": "USD", "value": "10.00" } }, "shipping": { "amount": { "currency_code": "USD", "value": "10.00" }, "tax": { "name": "Sales Tax", "percent": "7.25" } }, "discount": { "invoice_discount": { "percent": "5" } } } } })
});


{
  "id": "INV2-Z56S-5LLA-Q52L-CPZ5",
  "status": "DRAFT",
  "detail": {
    "invoice_number": "#123",
    "reference": "deal-ref",
    "invoice_date": "2018-11-12",
    "currency_code": "USD",
    "note": "Thank you for your business.",
    "term": "No refunds after 30 days.",
    "memo": "This is a long contract",
    "payment_term": {
      "term_type": "NET_10",
      "due_date": "2018-11-22"
    },
    "metadata": {
      "create_time": "2018-11-12T08:00:20Z",
      "recipient_view_url": "https://www.api-m.paypal.com/invoice/p#Z56S5LLAQ52LCPZ5",
      "invoicer_view_url": "https://www.api-m.paypal.com/invoice/details/INV2-Z56S-5LLA-Q52L-CPZ5"
    }
  },
  "invoicer": {
    "name": {
      "given_name": "David",
      "surname": "Larusso"
    },
    "address": {
      "address_line_1": "1234 First Street",
      "address_line_2": "337673 Hillside Court",
      "admin_area_2": "Anytown",
      "admin_area_1": "CA",
      "postal_code": "98765",
      "country_code": "US"
    },
    "email_address": "merchant@example.com",
    "phones": [
      {
        "country_code": "001",
        "national_number": "4085551234",
        "phone_type": "MOBILE"
      }
    ],
    "website": "https://example.com",
    "tax_id": "ABcNkWSfb5ICTt73nD3QON1fnnpgNKBy-Jb5SeuGj185MNNw6g",
    "logo_url": "https://example.com/logo.PNG",
    "additional_notes": "2-4"
  },
  "primary_recipients": [
    {
      "billing_info": {
        "name": {
          "given_name": "Stephanie",
          "surname": "Meyers"
        },
        "address": {
          "address_line_1": "1234 Main Street",
          "admin_area_2": "Anytown",
          "admin_area_1": "CA",
          "postal_code": "98765",
          "country_code": "US"
        },
        "email_address": "bill-me@example.com",
        "phones": [
          {
            "country_code": "001",
            "national_number": "4884551234",
            "phone_type": "HOME"
          }
        ],
        "additional_info_value": "add-info"
      },
      "shipping_info": {
        "name": {
          "given_name": "Stephanie",
          "surname": "Meyers"
        },
        "address": {
          "address_line_1": "1234 Main Street",
          "admin_area_2": "Anytown",
          "admin_area_1": "CA",
          "postal_code": "98765",
          "country_code": "US"
        }
      }
    }
  ],
  "items": [
    {
      "name": "Yoga Mat",
      "description": "Elastic mat to practice yoga.",
      "quantity": "1",
      "unit_amount": {
        "currency_code": "USD",
        "value": "50.00"
      },
      "tax": {
        "name": "Sales Tax",
        "percent": "7.25",
        "amount": {
          "currency_code": "USD",
          "value": "3.27"
        }
      },
      "discount": {
        "percent": "5",
        "amount": {
          "currency_code": "USD",
          "value": "2.5"
        }
      },
      "unit_of_measure": "QUANTITY"
    },
    {
      "name": "Yoga T Shirt",
      "quantity": "1",
      "unit_amount": {
        "currency_code": "USD",
        "value": "10.00"
      },
      "tax": {
        "name": "Sales Tax",
        "percent": "7.25",
        "amount": {
          "currency_code": "USD",
          "value": "0.34"
        }
      },
      "discount": {
        "amount": {
          "currency_code": "USD",
          "value": "5.00"
        }
      },
      "unit_of_measure": "QUANTITY"
    }
  ],
  "configuration": {
    "partial_payment": {
      "allow_partial_payment": true,
      "minimum_amount_due": {
        "currency_code": "USD",
        "value": "20.00"
      }
    },
    "allow_tip": true,
    "tax_calculated_after_discount": true,
    "tax_inclusive": false,
    "template_id": "TEMP-19V05281TU309413B"
  },
  "amount": {
    "currency_code": "USD",
    "value": "74.21",
    "breakdown": {
      "item_total": {
        "currency_code": "USD",
        "value": "60.00"
      },
      "custom": {
        "label": "Packing Charges",
        "amount": {
          "currency_code": "USD",
          "value": "10.00"
        }
      },
      "shipping": {
        "amount": {
          "currency_code": "USD",
          "value": "10.00"
        },
        "tax": {
          "name": "Sales Tax",
          "percent": "7.25",
          "amount": {
            "currency_code": "USD",
            "value": "0.73"
          }
        }
      },
      "discount": {
        "item_discount": {
          "currency_code": "USD",
          "value": "-7.50"
        },
        "invoice_discount": {
          "percent": "5",
          "amount": {
            "currency_code": "USD",
            "value": "-2.63"
          }
        }
      },
      "tax_total": {
        "currency_code": "USD",
        "value": "4.34"
      }
    }
  },
  "due_amount": {
    "currency_code": "USD",
    "value": "74.21"
  },
  "links": [
    {
      "href": "https://api-m.paypal.com/v2/invoicing/invoices/INV2-Z56S-5LLA-Q52L-CPZ5",
      "rel": "self",
      "method": "GET"
    },
    {
      "href": "https://api-m.paypal.com/v2/invoicing/invoices/INV2-Z56S-5LLA-Q52L-CPZ5/send",
      "rel": "send",
      "method": "POST"
    },
    {
      "href": "https://api-m.paypal.com/v2/invoicing/invoices/INV2-Z56S-5LLA-Q52L-CPZ5/update",
      "rel": "replace",
      "method": "PUT"
    },
    {
      "href": "https://api-m.paypal.com/v2/invoicing/invoices/INV2-Z56S-5LLA-Q52L-CPZ5",
      "rel": "delete",
      "method": "DELETE"
    },
    {
      "href": "https://api-m.paypal.com/v2/invoicing/invoices/INV2-Z56S-5LLA-Q52L-CPZ5/payments",
      "rel": "record-payment",
      "method": "POST"
    },
    {
      "href": "https://api-m.paypal.com/v2/invoicing/invoices/INV2-Z56S-5LLA-Q52L-CPZ5/generate-qr-code",
      "rel": "qr-code",
      "method": "POST"
    }
  ]
}

```
