const express = require('express');
const signup = require('./controllers/signup');
const router = require("express").Router();
const login = require('../src/controllers/login')
const product = require('./controllers/Products/products');
const productDelete = require('./controllers/Products/productDelete');
const updateProduct = require("./controllers/Products/productUpdate")
const uploads = product.uploads
const updateUpload = updateProduct.updateUpload
const getProduct = require("../src/controllers/Products/productGet")
const userSignup = require("../src/controllers/Users/userSignup");
const userLogin = require("../src/controllers/Users/userLogin");
const token = require("../src/controllers/Users/token");
const auth = require("./Authentication/auth")
const cart = require('./controllers/Order/cart')
const order = require("./controllers/Order/order")
// Token
router.post('/generate-jwt', token.generateToken)

// Admin 
router.post('/signup', signup.adminSignup);
router.post('/login', login.adminLogin);

//User 
router.post('/user/signup', userSignup.userSignup);
router.post('/user/Login', userLogin.userLogin);

router.post('/user/login')
//Products
router.post('/product', auth.authenticateToken, uploads.single("image"), product.createproduct);
router.delete('/delete/product/:id', productDelete.productDelete)
router.put('/update/product/:id', updateUpload.single("image"), updateProduct.updateProduct)
router.get('/get/product', getProduct.getProducts)
router.get('/get/product/:id', getProduct.getProdById)

//order
router.post('/order/cart', cart.cart)
router.post('/order', order.order)
module.exports = router;
