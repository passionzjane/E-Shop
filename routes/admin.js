const path = require('path');

const express = require('express');

const {getAddProduct, getProducts,postAddProduct,
    getEditProduct, postEditProduct, postDeleteProduct,
} = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/products => GET
router.get('/products', getProducts);

// /admin/add-product => POST
router.post('/add-product', postAddProduct);

router.get('/edit-product/:productId', getEditProduct);

router.post('/edit-product', postEditProduct);

router.post('/delete-product', postDeleteProduct);

module.exports = router;
