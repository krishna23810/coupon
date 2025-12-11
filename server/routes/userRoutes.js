const rout = require('express').Router();
const {create_User_Details, get_best_coupon} = require('../controllers/user_details');


rout.post('/details/:userId', create_User_Details);
// Params : userId
rout.post('/best-coupon/:userId', get_best_coupon);

module.exports = rout;
