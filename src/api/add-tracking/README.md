## Shipment Tracking

```bash
Merchants can use the PayPal Add Tracking API to manage tracking information. 
Merchants can add tracking numbers and associated information to PayPal. 
After adding these details to PayPal, merchants can:

- Update tracking details.
- Show tracking details.
- Cancel tracking numbers.

https://developer.paypal.com/docs/tracking/
https://developer.paypal.com/docs/tracking/integrate/

https://developer.paypal.com/docs/api/tracking/v1/#trackers-batch_post

```



## Add tracking information for multiple PayPal transactions
```bash
POST https://api-m.paypal.com/v1/shipping/trackers-batch
Adds tracking information, with or without tracking numbers, for multiple PayPal transactions. 
sAccepts up to 20 tracking IDs. For more information, see Add tracking information with tracking numbers and Add tracking information without tracking numbers.

> Request samples

var fetch = require('node-fetch');

fetch('https://api-m.sandbox.paypal.com/v1/shipping/trackers-batch', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <Access-Token>s
    },
    body: JSON.stringify(
    { 
      "trackers": [ 
        { 
          "transaction_id": "8MC585209K746392H", 
          "tracking_number": "443844607820", 
          "status": "SHIPPED", 
          "carrier": "FEDEX", 
          "shipment_direction": "FORWARD" 
        }, 
        { 
          "transaction_id": "53Y56775AE587553X", 
          "tracking_number": "443844607821", 
          "status": "SHIPPED", 
          "carrier": "FEDEX" 
        } 
      ] 
    })
});


> Response samples

{
  "tracker_identifiers": [
    {
      "transaction_id": "8MC585209K746392H",
      "tracking_number": "443844607820",
      "links": [
        {
          "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers/8MC585209K746392H-443844607820",
          "rel": "self",
          "method": "GET"
        },
        {
          "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers/8MC585209K746392H-443844607820",
          "rel": "replace",
          "method": "PUT"
        }
      ]
    },
    {
      "transaction_id": "53Y56775AE587553X",
      "tracking_number": "443844607821",
      "links": [
        {
          "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers/53Y56775AE587553X-443844607821",
          "rel": "self",
          "method": "GET"
        },
        {
          "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers/53Y56775AE587553X-443844607821",
          "rel": "replace",
          "method": "PUT"
        }
      ]
    }
  ],
  "errors": [
    {
      "name": "RESOURCE_NOT_FOUND",
      "debug_id": "46735c7461f3d",
      "message": "The specified resource does not exist.",
      "details": [
        {
          "field": "/trackers/0/transaction_id",
          "value": "8MC585309K746392H",
          "location": "body",
          "issue": "INVALID_TRANSACTION_ID"
        }
      ]
    }
  ],
  "links": [
    {
      "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers-batch",
      "rel": "self",
      "method": "POST"
    }
  ]
}

```



## Add tracking information for PayPal transaction
```bash
Adds tracking information for a PayPal transaction.

POST https://api-m.paypal.com/v1/shipping/trackers

> Request samples

var fetch = require('node-fetch');

fetch('https://api-m.sandbox.paypal.com/v1/shipping/trackers', {
    method: 'POST',
    headers: {
        'X-PAYPAL-SECURITY-CONTEXT': '',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(
    { 
      "trackers": [ 
        { 
          "transaction_id": "8MC585209K746392H", 
          "tracking_number": "443844607820", 
          "status": "SHIPPED", 
          "carrier": "FEDEX", 
          "shipment_direction": "FORWARD" 
        }, 
        { 
          "transaction_id": "53Y56775AE587553X", 
          "tracking_number": "443844607821", 
          "status": "SHIPPED", 
          "carrier": "FEDEX" 
        } 
      ] 
    })
});



> Response samples
{
  "tracker_identifiers": [
    {
      "transaction_id": "8MC585209K746392H",
      "tracking_number": "443844607820",
      "links": [
        {
          "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers/8MC585209K746392H-443844607820",
          "rel": "self",
          "method": "GET"
        },
        {
          "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers/8MC585209K746392H-443844607820",
          "rel": "update",
          "method": "PUT"
        },
        {
          "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers/8MC585209K746392H-443844607820",
          "rel": "patch",
          "method": "PATCH"
        }
      ]
    },
    {
      "transaction_id": "53Y56775AE587553X",
      "tracking_number": "443844607821",
      "links": [
        {
          "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers/53Y56775AE587553X-443844607821",
          "rel": "self",
          "method": "GET"
        },
        {
          "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers/53Y56775AE587553X-443844607821",
          "rel": "replace",
          "method": "PUT"
        },
        {
          "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers/53Y56775AE587553X-443844607821",
          "rel": "edit",
          "method": "PATCH"
        }
      ]
    }
  ]
}

```



## List tracking information
```bash
Lists tracking information that meet search criteria. 
The tracking ID is required but the tracking number is optional.

POST https://api-m.paypal.com/v1/shipping/trackers

> Request samples
var fetch = require('node-fetch');

fetch('https://api-m.sandbox.paypal.com/v1/shipping/trackers?tracking_number=443844607820&transaction_id=8MC585209K746392H', {
    headers: {
        'X-PAYPAL-SECURITY-CONTEXT': '',
        'Content-Type': 'application/json'
    }
});

> Response samples
{
  "transaction_id": "8MC585209K746392H",
  "tracking_number": "443844607820",
  "status": "SHIPPED",
  "carrier": "FEDEX",
  "shipment_direction": "FORWARD",
  "shipment_uploader": "PARTNER",
  "links": [
    {
      "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers/8MC585209K746392H-443844607820",
      "rel": "self"
    },
    {
      "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers/8MC585209K746392H-443844607820",
      "rel": "replace",
      "method": "PUT"
    },
    {
      "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers/8MC585209K746392H-443844607820",
      "rel": "edit",
      "method": "PATCH"
    },
    {
      "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers-batch",
      "rel": "create",
      "method": "POST"
    }
  ]
}
```


## Update or cancel tracking information for PayPal transaction
```bash
Updates or cancels the tracking information for a PayPal transaction, by ID. 
To cancel tracking information, call this method and set the status to CANCELLED. 
For more information, see Update or cancel tracking information.

PUT https://api-m.paypal.com/v1/shipping/trackers/{id} 

> Request samples
var fetch = require('node-fetch');

fetch('https://api-m.sandbox.paypal.com/v1/shipping/trackers/8MC585209K746392H-443844607820', {
    method: 'PUT',
    headers: {
        'X-PAYPAL-SECURITY-CONTEXT': '',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <Access-Token>'
    },
    body: JSON.stringify(
      { 
        "transaction_id": "8MC585209K746392H", 
        "tracking_number": "443844607820", 
        "status": "SHIPPED", 
        "carrier": "FEDEX", 
        "shipment_direction": "FORWARD" 
      }
    )
});


> Response samples
```



## Show tracking information
```bash
Shows tracking information, by tracker ID, for a PayPal transaction.

GET https://api-m.paypal.com/v1/shipping/trackers/{id}

> Request samples
var fetch = require('node-fetch');

fetch('https://api-m.sandbox.paypal.com/v1/shipping/trackers/8MC585209K746392H-443844607820', {
    headers: {
        'X-PAYPAL-SECURITY-CONTEXT': '',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <Access-Token>'
    }
});


> Response samples
{
  "transaction_id": "8MC585209K746392H",
  "tracking_number": "443844607820",
  "status": "SHIPPED",
  "carrier": "FEDEX",
  "shipment_direction": "FORWARD",
  "shipment_uploader": "MERCHANT",
  "links": [
    {
      "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers/8MC585209K746392H-443844607820",
      "rel": "self"
    },
    {
      "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers/8MC585209K746392H-443844607820",
      "rel": "replace",
      "method": "PUT"
    },
    {
      "href": "https://api-m.sandbox.paypal.com/v1/shipping/trackers-batch",
      "rel": "create",
      "method": "POST"
    }
  ]
}
```


