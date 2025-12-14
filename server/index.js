const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const connectDB = require('./config/dbconect');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

connectDB();

app.get('/', (req, res) => {
  res.send('E-commerce Coupon Management Service is running!');
});

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Coupon Service listening at http://localhost:${port}`);
});

const couponRoutes = require('./routes/couponRoutes');
const userRoutes = require('./routes/userRoutes');
const loginSignupRoutes = require('./routes/login_singup');
const productRoutes = require('./routes/productRoutes');

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));

app.use('/api/coupon', couponRoutes);
app.use('/api/user', userRoutes);
app.use('/api/loginSignup', loginSignupRoutes);
app.use('/api/product', productRoutes);

module.exports = app;
