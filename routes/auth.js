const express = require('express');

const {getLogin, postLogin, postLogout,
     getSignup, postSignup, getReset,
     postReset} = require('../controllers/auth');

const router = express.Router();

router.get('/login', getLogin);

router.get('/signup', getSignup);

router.get("/reset", getReset);

router.post('/login', postLogin);

router.post('/signup', postSignup);

router.post('/logout', postLogout);

router.post("/reset", postReset);




module.exports = router;