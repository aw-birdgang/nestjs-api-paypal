
## Disputes

```bash

Acknowledges that the customer returned an item for a dispute, by ID. 
A merchant can make this request for disputes with the MERCHANDISE_OR_SERVICE_NOT_AS_DESCRIBED reason. 
Allowed acknowledgement_type values for the request is available in dispute details allowed response options object. 
For constraints and rules regarding documents, see documents.

```

## Create order
```bash
var fetch = require('node-fetch');

fetch('https://api-m.sandbox.paypal.com/v1/customer/disputes/PP-000-000-651-454/acknowledge-return-item', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer A101.OLQiCxMmoVwigKQQDu3CYlamZ1KTKQmhrbAZK85RIy4IiWh9d_up_Nliuq_lfZdU.P3gvkY3PO28akjKYaDorm12QdfK'
    },
    body: JSON.stringify({ "note": "I have received the item back.", "acknowledgement_type": "ITEM_RECEIVED" })
});


{
  "links": [
    {
      "rel": "self",
      "method": "GET",
      "href": "https://api-m.sandbox.paypal.com/v1/customer/disputes/PP-000-000-651-454"
    }
  ]
}
```


## Show order details
```bash

```
