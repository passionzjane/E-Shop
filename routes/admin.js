const path = require('path');

const express = require('express');
const {body} = require('express-validator')

const {getAddProduct, getProducts,postAddProduct,
    getEditProduct, postEditProduct, postDeleteProduct,
} = require('../controllers/admin');
const isAuth = require('../middleware/is-auth')

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  postAddProduct
);

router.get(
  "/edit-product/:productId",
  [
    body("title").isAlphanumeric().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  getEditProduct
);

router.post("/edit-product", isAuth, postEditProduct);

router.post("/delete-product", isAuth, postDeleteProduct);

module.exports = router;
