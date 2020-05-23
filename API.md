## Server API

### Get random tour and get tour by id
  * GET `/tour/:id`
**Path Parameters:**
  * `id` tour id

**Success Status Code:** `200`

**Both return:** JSON

```json
    {
      "id": "id Number",
      "name": "String",
      "overview": "String",
      "cancellation_policy": "String",
      "return_details": "String",
      "startpoint_name": "String",
      "startpoint_street": "String",
      "startpoint_details": "String",
      "endpoint_name": "String",
      "endpoint_street": "String",
      "endpoint_details": "String",
      "Stops": [
        {
          "stop_id": "id Number",
          "position": "Number",
          "duration": "Number",
          "admission_details": "String",
          "stop_description": "String",
          "attraction_name": "String",
          "latitude": "Number FLOAT",
          "longitude": "Number FLOAT",
          "rating": "Number",
          "review_count": "Number",
          "attraction_url": "String",
          "image_path": "Image URL",
          "image_alt": "String",
        },
      ]
    }
```

### Add tour
  * POST `/tour/`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "name": "String",
      "overview": "String",
      "cancellation_policy": "String",
      "return_details": "String",
      "startpoint_name": "String",
      "startpoint_street": "String",
      "startpoint_details": "String",
      "endpoint_name": "String",
      "endpoint_street": "String",
      "endpoint_details": "String",
      "Stops": [
        {
          "position": "Number",
          "duration": "Number",
          "admission_details": "String",
          "stop_description": "String",
          "attraction_name": "String",
          "latitude": "Number FLOAT",
          "longitude": "Number FLOAT",
          "rating": "Number",
          "review_count": "Number",
          "attraction_url": "String",
          "image_path": "Image URL",
          "image_alt": "String",
        },
      ]
    }
```

### Update tour info
  * PATCH `/tour/:id`

**Path Parameters:**
  * `id` tour id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "name": "String",
      "overview": "String",
      "cancellation_policy": "String",
      "return_details": "String",
      "startpoint_name": "String",
      "startpoint_street": "String",
      "startpoint_details": "String",
      "endpoint_name": "String",
      "endpoint_street": "String",
      "endpoint_details": "String",
    }
```

### Update stop info
  * PATCH `/tour/:tourId/stop/:stopId`

**Path Parameters:**
  * `tourId` tour id
  * `stopId` stop id
  
**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "position": "Number",
      "duration": "Number",
      "admission_details": "String",
      "stop_description": "String",
    }
```

### Delete tour
  * DELETE `/tour/:id`

**Path Parameters:**
  * `id` tour id

**Success Status Code:** `204`

### Delete attraction from tour
  * DELETE `/tour/:tourId/stop/:stopId`

**Path Parameters:**
  * `tourId` tour id
  * `stopId` stop id
  
**Success Status Code:** `204`

