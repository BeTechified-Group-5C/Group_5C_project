# Product Inventory API

A RESTful backend service for managing product inventory, built with Node.js and Express. It supports full CRUD operations (Create, Read, Update, Delete) on an in-memory product collection.

## Tech Stack

- **Node.js** — runtime
- **Express.js** — routing and middleware
- **dotenv** — environment variable management

## Project Structure

```
project-root/
├── server.js                  # App entry point
├── routes/
│   ├── get_all.js             # GET /
│   ├── get_single.js          # GET /:id
│   ├── post.js                # POST /
│   ├── patch.js                # PATCH /:id
│   ├── delete.js               # DELETE /:id
│   └── data/
│       └── inventory.js       # In-memory data store
├── middleware/
│   └── error_handler.js       # Centralized error handling
├── .env                        # PORT config
└── package.json
```

## Setup

1. Install dependencies:
   ```bash
   npm install express dotenv
   ```
2. Create a `.env` file in the project root:
   ```
   PORT=3000
   ```
3. Start the server:
   ```bash
   node server.js
   ```
   The API will be available at `http://localhost:3000`.

## How a Request Flows Through the API

1. **Entry (`server.js`)** — Every request first hits `express.json()`, which parses incoming JSON request bodies into `req.body`.
2. **Routing** — Five routers are all mounted at the root path (`/`). Express matches requests by **HTTP method + path** together, so even though several routers define overlapping paths (`/` or `/:id`), there's no conflict because each router only responds to one verb (GET, POST, PATCH, or DELETE).
3. **Handler execution** — The matched route handler reads from (or writes to) the shared `inventory` array, which every route file imports from `routes/data/inventory.js`. Because this is a single shared array reference, changes made in one request (e.g. a `POST`) are immediately visible to the next request (e.g. a `GET`).
4. **Response** — The handler sends a JSON response with an appropriate status code.
5. **Error handling** — `error_handler.js` is registered last with `app.use(errorHandler)`. Express routes any call to `next(err)` — or any thrown error in an async chain — here, and it responds with a consistent JSON error shape instead of leaking a stack trace.

```
Client → express.json() → Router (method + path match) → Handler → Shared inventory[] → Response
                                                              ↓ (on error)
                                                        error_handler.js
```

## Data Model

Each product in `inventory` has the shape:

```json
{
  "id": 1,
  "name": "Laptop",
  "category": "Electronics",
  "quantity": 15,
  "price": 85000,
  "inStock": true
}
```

The store ships with 4 seed products and lives only in memory — data resets whenever the server restarts.

## API Reference

| Method | Endpoint | Description | Body | Success | Error |
|---|---|---|---|---|---|
| GET | `/` | Return all products | — | `200` + array | — |
| GET | `/:id` | Return one product by id | — | `200` + object | `404` if not found |
| POST | `/` | Create a new product | `name, category, quantity, price` required; `inStock` optional | `201` + created object | `400` if a required field is missing |
| PATCH | `/:id` | Update fields on an existing product | Any subset of product fields | `200` + updated object | `404` if not found |
| DELETE | `/:id` | Remove a product by id | — | `200` | `404` if not found |

### Example: creating a product

```bash
curl -X POST http://localhost:3000/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Monitor","category":"Electronics","quantity":10,"price":65000,"inStock":true}'
```

### Example: updating a product

```bash
curl -X PATCH http://localhost:3000/2 \
  -H "Content-Type: application/json" \
  -d '{"quantity":25}'
```