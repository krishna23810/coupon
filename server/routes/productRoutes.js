const rout = require('express').Router();

const {createProduct,getAllProducts} = require('../controllers/productController');


rout.post('/create/:userId', createProduct);
rout.get('/getAll/:userId', getAllProducts);

module.exports = rout;
