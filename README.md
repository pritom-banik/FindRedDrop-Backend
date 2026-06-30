# FindRedDrop Backend

FindRedDrop is a MERN-stack blood donation support application. This repository contains the REST API backend server that powers user registration helpers, blood request management, funding records, admin analytics, and public donor search.

##  Overview

- **Backend type:** REST API server
- **Framework:** Express.js
- **Database:** MongoDB
- **Auth:** JWT verification via JWKS
- **Primary role:** Manage blood donation requests, user data, funding records, and admin operations

## Live Frontend & Repo

- Frontend repository: https://github.com/pritom-banik/FindRedDrop
- Live frontend: https://find-red-drop.vercel.app/

##  Project Structure

- `index.js` — main server entrypoint
- `config/database.js` — MongoDB connection helper
- `middlewire/middlewire.js` — authentication middleware
- `modules/registration` — registration helper routes and controllers
- `modules/request` — blood request CRUD routes and controllers
- `modules/userinfo` — user request and funding endpoints
- `modules/admin` — admin analytics, user management, and public donor search
- `extras/welcome.js` — root welcome response

##  Prerequisites

- Node.js installed
- MongoDB instance or MongoDB Atlas cluster
- `.env` file with required environment variables

##  Installation

```bash
npm install
```

##  Environment Variables

The `.env` file structure :

```env
PORT=
MONGODB_URI=
DATABASE_NAME=
CLIENT_URL=
```

- `PORT` — port to run the server on (default `5002`)
- `MONGODB_URI` — MongoDB connection string
- `DATABASE_NAME` — the database name used by this backend
- `CLIENT_URL` — URL of the frontend/auth provider used to resolve JWKS

##  Start the Server

```bash
npm start
```

The server starts after MongoDB connects successfully.

##  API Base URL

All endpoints are mounted under:

```
/api
```

The root route is available at `GET /` and returns a simple welcome message.

##  Authentication

Protected endpoints require an `Authorization` header:

```http
Authorization: Bearer <token>
```

The middleware verifies JWTs using JWKS resolved from:

```
${process.env.CLIENT_URL}/api/auth/jwks
```

##  Endpoints

### Registration Helpers

#### GET /api/districts

- Returns a sorted list of districts.
- Response fields: `name`, `id`

#### GET /api/upazilas/:districtId

- Returns upazilas for a given district.
- Path parameter: `districtId`
- Response fields: `id`, `name`

### Blood Request Management

#### POST /api/create-blood-request

- Creates a new blood request.
- Protected route
- Request body: any fields required by the client, plus backend adds `createdAt` and `updatedAt`.
- Response: insert result with inserted ID.

#### GET /api/get-blood-requests

- Returns pending blood requests.
- Query params:
  - `page` (default `1`)
  - `limit` (default `10`)
- Response includes:
  - `recipientName`
  - `district`
  - `upazila`
  - `bloodGroup`
  - `donationDate`
  - `donationTime`
  - `status`

#### GET /api/get-blood-request/:id

- Returns details of a single blood request.
- Protected route
- Path parameter: `id`

#### PATCH /api/update-blood-request-status/:id

- Updates status of a blood request.
- Protected route
- Path parameter: `id`
- Request body must include `status`.
- Supported `status` values:
  - `done`
  - `inprogress`
  - `cancel`
- For `inprogress`, body may also contain `donorEmail` and `donorName`.

#### PATCH /api/update-blood-request/:id

- Updates a blood request record.
- Protected route
- Path parameter: `id`
- Requires `requesterId` in the body for authorization.
- Any other request fields are updated and `updatedAt` is refreshed.

#### DELETE /api/delete-by-id/:id

- Deletes a blood request with `status: pending` only.
- Protected route
- Path parameter: `id`

### User Info & Funding

#### GET /api/get-all-my-requests/:id

- Returns blood requests created by a user.
- Protected route
- Path parameter: `id` = requester/user ID
- Query params:
  - `page` (default `1`)
  - `limit` (default `5`)
  - `status` (use `all` to disable status filtering)

#### POST /api/register-all-my-fundings

- Stores funding details.
- Protected route
- Request body: funding data from client
- Backend adds `createdAt`

#### GET /api/get-all-funding

- Returns funding records.
- Protected route
- Query params:
  - `page` (default `1`)
  - `limit` (default `10`)
- Response includes `name`, `amount`, `createdAt`

### Admin Operations

#### POST /api/admin/get-all-requests

- Returns blood requests for admin review.
- Protected route
- Request body must contain `role` equal to `admin` or `volunteer`.
- Query params:
  - `page` (default `1`)
  - `limit` (default `5`)
  - `status` (use `all` to skip status filtering)

#### POST /api/admin/get-all-users

- Returns users for admin management.
- Protected route
- Request body must contain `role` equal to `admin`.
- Query params:
  - `page` (default `1`)
  - `limit` (default `5`)
  - `status` (use `all` to skip status filtering)

#### PATCH /api/admin/user-status-change/:id

- Updates user `status`.
- Protected route
- Path parameter: `id`
- Request body must include:
  - `status`
  - `me` = `admin`

#### PATCH /api/admin/change-user-role/:id

- Updates user `role`.
- Protected route
- Path parameter: `id`
- Request body must include:
  - `role`
  - `me` = `admin`

#### GET /api/admin/get-total-user

- Returns the total count of users.
- Protected route

#### GET /api/admin/get-total-funding

- Returns the total funding amount across all funding records.
- Protected route

#### GET /api/admin/get-total-blood-request-info

- Returns aggregated blood request counts:
  - `totalRequests`
  - `totalPending`
  - `totalInprogress`
  - `totalDone`
  - `totalCancel`
- Protected route

#### GET /api/user/get-all-users

- Public donor search endpoint.
- Optional query params:
  - `page` (default `1`)
  - `limit` (default `5`)
  - `bloodGroup`
  - `district`
  - `upazila`
- Returns active donors and volunteers.
- Only users with `status: active` and `role` in `donor` or `volunteer` are returned.

##  Notes

- The backend accepts JSON requests via `express.json()`.
- CORS is enabled for cross-origin support.
- Admin and protected routes rely on `middlewire.verifyToken`.
- The server logs `Welcome to FindRedDrop at port <PORT>` after successful startup.

---
##  Project Links

[![Frontend Repo](https://img.shields.io/badge/Frontend-GitHub-black?style=for-the-badge&logo=github)](https://github.com/pritom-banik/FindRedDrop)



[![Backend Repo](https://img.shields.io/badge/Backend-GitHub-black?style=for-the-badge&logo=github)](https://github.com/pritom-banik/FindRedDrop-Backend)

[![Live Site](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://find-red-drop.vercel.app/)


---
- Pritom Banik (Jun 30, 2026)

