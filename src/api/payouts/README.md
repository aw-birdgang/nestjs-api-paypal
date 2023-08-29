
## Payouts

```bash

Use the Payouts API to make payments to multiple PayPal or Venmo recipients. 
The Payouts API is a fast, convenient way to send commissions, rebates, rewards, and general disbursements. 
You can send up to 15,000 payments per call. 
If you integrated the Payouts API before September 1, 2017, you receive transaction reports through Mass Payments Reporting. 
Otherwise, view reports from your PayPal Business account. The Payouts API uses the ISO 8601 Internet date and time format.

```



## Create batch payout
```bash
Creates a batch payout. 
In the JSON request body, pass a sender_batch_header and an items array. 
The sender_batch_header defines how to handle the payout. 
The items array defines the payout items.
You can make payouts to one or more recipients.


POST https://api-m.paypal.com/v1/payments/payouts


var fetch = require('node-fetch');

fetch('https://api-m.sandbox.paypal.com/v1/payments/payouts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer A101.OLQiCyqOpVwigKQQDu3CYlamZ1KTKQmhrbAZK85RIy4IiWh9d_up_lTadp_lfXdV.P3gvkY3PO28akjKYaDorm12QdfK'
    },
    body: JSON.stringify({ 
      "sender_batch_header": 
          { "sender_batch_id": "Payouts_2020_100007", 
            "email_subject": "You have a payout!", 
            "email_message": "You have received a payout! Thanks for using our service!" 
          }, 
          "items": [ 
            { 
              "recipient_type": "EMAIL", 
              "amount": { 
                "value": "9.87", "currency": "USD" 
              }, 
              "note": "Thanks for your patronage!", 
              "sender_item_id": "201403140001", 
              "receiver": "receiver@example.com", 
              "recipient_wallet": "RECIPIENT_SELECTED" 
            } 
          ] 
      })
});


{
  "batch_header": {
    "sender_batch_header": {
      "sender_batch_id": "Payouts_2020_100007",
      "email_subject": "You have a payout!",
      "email_message": "You have received a payout! Thanks for using our service!"
    },
    "payout_batch_id": "5UXD2E8A7EBQJ",
    "batch_status": "PENDING"
  }
}




```
