const rout = require('express').Router();

const {createUser,loginUser} = require('../controllers/user');


rout.post('/signup', createUser);
rout.post('/login', loginUser);

module.exports = rout;
