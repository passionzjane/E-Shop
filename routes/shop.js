const path = require('path');

const express = require('express');

const {
  getIndex,
  getProducts,
  getProduct,
  getCart,
  postCart,
  postCartDeleteProduct,
  postOrder,
  getOrders,
} = require("../controllers/shop");

const router = express.Router();

router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/products/:productId', getProduct);

router.get('/cart', getCart);

router.post('/cart', postCart);

router.post('/cart-delete-item', postCartDeleteProduct);

router.post('/create-order', postOrder);

router.get('/orders', getOrders);

module.exports = router;
