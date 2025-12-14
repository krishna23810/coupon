# Coupon Management API

## Project Overview
A full-stack Coupon Management System that helps users find the best coupon codes to maximize their discounts. The application allows users to create, manage, and apply coupons to their purchases. It intelligently analyzes available coupons and recommends the best one to get the maximum discount on their cart.

## Tech Stack

| Layer      | Technology        |
|------------|-------------------|
| Frontend   | React + Vite      |
| Backend    | Node.js + Express |
| Database   | MongoDB           |

### Key Libraries
- **Frontend:** React, Axios, React Router
- **Backend:** Express.js, Mongoose, CORS, dotenv
- **Database:** MongoDB (Mongoose ODM)

## How to Run

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (local or Atlas connection string)

### Setup Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/krishna23810/coupon.git
cd coupon
npm install
cd server
npm install

#### To start frontend server
cd coupon
npm install


#### To start backend serve
cd server
npm start
# or
node index.js
# or 
npm rundev



Method	Endpoint	Description
GET	/api/coupons	Get all coupons
POST	/api/coupons	Create a new coupon
GET	/api/coupons/:id	Get coupon by ID
PUT	/api/coupons/:id	Update a coupon
DELETE	/api/coupons/:id	Delete a coupon
POST	/api/coupons/best	Find best coupon for cart



