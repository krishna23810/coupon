const rout = require('express').Router();

const {createCoupon, getAllCoupons ,addCouponToUser} = require('../controllers/Coupon');
const {get_best_coupon} = require('../controllers/user_details');

rout.post('/create', createCoupon);
rout.get('/all', getAllCoupons);
rout.get('/best-coupon/:userId', get_best_coupon);
rout.post('/add-to-user/:userId/:couponCode', addCouponToUser);

module.exports = rout;