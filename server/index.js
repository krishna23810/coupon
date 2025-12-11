const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const connectDB = require('./config/dbconect');

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
app.use('/coupon', couponRoutes);
app.use('/user', userRoutes);
app.use('/loginSignup', loginSignupRoutes);

module.exports = app;
