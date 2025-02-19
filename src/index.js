const express = require('express');
const signup = require('./Admin/signup');
const router = require("express").Router();
const login = require('./Admin/login')
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
const order = require("./controllers/Order/order");
const { getOrder, getOrderById } = require('./Admin/getOrder');
const { getUser ,getUserById} = require('./Admin/getUser');
const { deleteUser } = require('./Admin/deleteUser');
const { confirmOrder, deliverOrder, cancelOrder } = require('./controllers/Order/confirmOrder');
const getProductByCategory = require('./controllers/Products/getProductByCategory');
const {category,getAllCategory} = require('./controllers/Products/category');

// Token
router.post('/generate-jwt', token.generateToken)

// Admin 
router.post('/signup', signup.adminSignup);
router.post('/login', login.adminLogin);
router.get('/get/orders', getOrder)
router.get('/get/orders/:id', getOrderById)
router.get('/get/users', getUser)
router.get('/get/users/:id', getUserById)
router.delete('/delete/user/:id', deleteUser)

//User 
router.post('/user/signup', userSignup.userSignup);
router.post('/user/Login', userLogin.userLogin);

router.post('/user/login')
//Products
router.post('/product', uploads.single("image"), product.createproduct);
router.delete('/delete/product/:id', productDelete.productDelete)
router.put('/update/product/:id', updateUpload.single("image"), updateProduct.updateProduct)
router.get('/get/product', getProduct.getProducts)
router.get('/get/product/:id', getProduct.getProdById)
router.get('/get/product/category/:category', getProductByCategory)
router.post('/create/category', category)
router.get('/get/all/category', getAllCategory)


//order
router.post('/order/cart', cart.cart)
router.post('/order',  order.order)
router.patch('/order/confirm/:orderId', confirmOrder); //change status to Shipped
router.patch('/order/delivered/:orderId', deliverOrder); //change status to Delivered
router.patch('/order/cancel/:orderId', cancelOrder); //change status to Cancelled


module.exports = router;  
