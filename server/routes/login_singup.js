const rout = require('express').Router();

const {createUser,loginUser ,getUserDetails} = require('../controllers/user');


rout.post('/signup', createUser);
rout.post('/login', loginUser);
rout.get('/userDetails/:userId', getUserDetails);

module.exports = rout;
