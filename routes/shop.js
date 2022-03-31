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
  getInvoice,
  getCheckout,
  getCheckoutSuccess
} = require("../controllers/shop");
const isAuth = require('../middleware/is-auth')

const router = express.Router();

router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/products/:productId', getProduct);

router.get("/cart", isAuth, getCart);

router.post("/cart", isAuth, postCart);

router.post("/cart-delete-item", isAuth, postCartDeleteProduct);

router.get("/checkout", isAuth, getCheckout);

router.get("/checkout/success", getCheckoutSuccess);

router.get("/checkout/cancel", getCheckout);

router.get("/orders", isAuth, getOrders);

router.get('/orders/:orderId', isAuth, getInvoice)

module.exports = router;
