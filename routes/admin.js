const path = require('path');

const express = require('express');

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
router.post("/add-product", isAuth, postAddProduct);

router.get("/edit-product/:productId", isAuth, getEditProduct);

router.post("/edit-product", isAuth, postEditProduct);

router.post("/delete-product", isAuth, postDeleteProduct);

module.exports = router;
