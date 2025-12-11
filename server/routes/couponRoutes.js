const rout = require('express').Router();

const {createCoupon, getAllCoupons} = require('../controllers/Coupon');

rout.post('/create', createCoupon);
rout.get('/all', getAllCoupons);

module.exports = rout;