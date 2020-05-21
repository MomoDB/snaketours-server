## Server API

### Get random tour and get tour by id
  * GET `/tour/`
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
      "createdAt": "YYYY-MM-DDThh:mm:ss.sTZD",
      "updatedAt": "YYYY-MM-DDThh:mm:ss.sTZD",
      "Attractions": [
        {
            "id": "id Number",
            "name": "String",
            "latitude": "Number FLOAT",
            "longitude": "Number FLOAT",
            "description": "String",
            "rating": "Number",
            "attraction_url": "String",
            "image_path": "Image URL",
            "image_alt": "String",
            "createdAt": "YYYY-MM-DDThh:mm:ss.sTZD",
            "updatedAt": "YYYY-MM-DDThh:mm:ss.sTZD",
            "ToursAttractions": {
                "createdAt": "YYYY-MM-DDThh:mm:ss.sTZD",
                "updatedAt": "YYYY-MM-DDThh:mm:ss.sTZD",
                "AttractionId": "Id Number",
                "TourId": "Id Number"
            }
        },
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
    }
```
### Add attraction
  * POST `/attraction/`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "name": "String",
      "latitude": "Number FLOAT",
      "longitude": "Number FLOAT",
      "description": "String",
      "rating": "Number FLOAT",
      "attraction_url": "String",
      "image_path": "String",
      "image_alt": "String",
    }
```

### Add attraction to tour
  * POST `/tour/:tourId/attractions/:attractionId`

**Path Parameters:**
  * `id` tour id
  * `id` attraction id
**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "tour_id": "id Number",
      "attraction_id": "id Number",
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
    }
```

### Update attraction info
  * PATCH `/attraction/:id`

**Path Parameters:**
  * `id` attraction id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "name": "String",
      "description": "String",
      "image_path": "Image URL",
      "image_alt": "String",
    }
```

### Delete tour (Note: Would I also need to update join table?)
  * DELETE `/tour/:id`

**Path Parameters:**
  * `id` tour id

**Success Status Code:** `204`


### Delete attraction (Note: Would I also need to update join table?)
  * DELETE `/attraction/:id`

**Path Parameters:**
  * `id` attraction id

**Success Status Code:** `204`


### Delete attraction from tour (Note: Would I also need to update join table?)
  * DELETE `/tour/:tourId/attractions/:attractionId`

**Path Parameters:**
  * `id` attraction id

**Success Status Code:** `204`