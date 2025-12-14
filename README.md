text
# Coupon Management System

A full‑stack Coupon Management System that lets users create, manage, and apply coupon codes to get the maximum possible discount on their cart.

The app supports:

- Creating flexible coupons (flat or percentage).
- Applying user‑based rules (tiers, country, first‑order, min lifetime spend, etc.).
- Applying cart‑based rules (min cart value, item count, include/exclude categories).
- Automatically selecting the best coupon for a given cart.

---

## Tech Stack

| Layer    | Technology        |
|---------|-------------------|
| Frontend | React + Vite      |
| Backend  | Node.js + Express |
| Database | MongoDB (Mongoose)|

### Main Libraries

- **Frontend:** React, React Router, Axios, React Hook Form, Tailwind CSS, React Hot Toast
- **Backend:** Express.js, Mongoose, CORS, dotenv
- **Database:** MongoDB (local or MongoDB Atlas)

---

## Features

- Dashboard to manage products, cart items, and coupons.
- Create coupons with:
  - Flat or percentage discounts
  - User tiers (NEW, REGULAR, GOLD, EVERYONE)
  - Country restrictions
  - First‑order only / min lifetime spend / min orders
  - Min cart value and min cart items
  - Applicable and excluded categories
- View all coupons in an admin table with clear user/cart rules.
- Backend API to compute the “best coupon” for a cart.

---

## Getting Started (Local Development)

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB (running locally or MongoDB Atlas connection string)

### 1. Clone the Repository

git clone https://github.com/krishna23810/coupon.git
cd coupon


### 2. Install Dependencies

**Frontend (root, React + Vite):**

from project root
npm install


**Backend (Node + Express in /server):**

cd server
npm install


### 3. Configure Environment Variables (Backend)

Inside the `server` folder, create a `.env` file:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL =your_frontend_url


You can use either a local Mongo URI (`mongodb://127.0.0.1:27017/coupon-db`)
or a MongoDB Atlas URI.

### 4. Run the Backend

cd server
npm start

or, if you have a dev script:
npm run dev


The API should be available on:

http://localhost:3000


### 5. Run the Frontend

In a new terminal 
window:cd coupon # project root

npm run dev

Vite will start the React app on a port like:http://localhost:5173

Make sure the frontend is calling the correct backend URL in your API helper (e.g. `http://localhost:3000` in development).

---

## API Endpoints (Backend)

Base URL (local): `http://localhost:3000`

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | `/api/coupons`      | Get all coupons          |
| POST   | `/api/coupons`      | Create a new coupon      |
| GET    | `/api/coupons/:id`  | Get coupon by ID         |
| PUT    | `/api/coupons/:id`  | Update a coupon          |
| DELETE | `/api/coupons/:id`  | Delete a coupon          |
| POST   | `/api/coupons/best` | Find best coupon for cart|

*(Adjust the base path if your server uses `/coupon/...` instead of `/api/coupons/...`.)*
---

## Project Structure

coupon/
├── src/ # React + Vite frontend
│ ├── components/
│ ├── pages/
│ ├── App.jsx
│ └── main.jsx
├── package.json # Frontend package.json (Vite)
├── vite.config.* # Vite configuration
│
├── server/ # Node.js + Express backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── index.js
│ └── package.json
│
└── README.md
---

## Production Build & Deployment (Frontend)

To build the frontend for production:

npm run build

This runs `vite build` and outputs static files into the `dist` directory, which can be deployed to any static host (Vercel, Netlify, etc.).

Example Vercel configuration:

- **Root Directory:** project root (where this `package.json` lives)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

For client‑side routing (React Router) on Vercel, add a `vercel.json` at the project root:

{
"rewrites": [
{ "source": "/(.*)", "destination": "/index.html" }
]
}

This ensures all routes serve `index.html` and are handled by React Router in the browser.

---

## Production Deployment (Backend)

Typical steps to deploy the backend (for example, on Render):

1. Push this repository to GitHub.
2. Create a new Web Service on Render and point it to the `/server` folder.
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables (`MONGODB_URI`, `PORT`, and others) in Render’s dashboard.
6. After deployment, you will get a backend URL, for example:

https://coupon-backend.onrender.com

text

Update your frontend API base URL/env (`VITE_API_URL`) to point to this URL in production.

---

## Frontend Scripts

From the project root:

- `npm run dev` – start Vite dev server
- `npm run build` – build for production
- `npm run preview` – preview the production build locally
- `npm run lint` – run ESLint

---

## Future Improvements

- Authentication and role‑based access (admin vs normal user).
- Pagination and filtering for the coupons table.
- Analytics for coupon usage (top‑used coupons, success rates).
- Email / notification integration when new coupons are created.

---

Happy coding! 🎟️🛒
