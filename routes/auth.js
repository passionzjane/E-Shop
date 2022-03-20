const express = require('express');
const { check} = require('express-validator');

const {getLogin, postLogin, postLogout,
     getSignup, postSignup, getReset,
     postReset, getNewPassword, postNewPassword} = require('../controllers/auth');

const router = express.Router();

router.get('/login', getLogin);

router.get('/signup', getSignup);

router.get("/reset", getReset);

router.post('/login', postLogin);

router.post('/signup', 
check('email')
.isEmail()
.withMessage('Please enter a valid email or password')
.custom((value, {req }) => {
     if (value === 'tony@mail.com') {
          throw new Error('This email address is forbidden.')
     }
     return true;
}),
postSignup);

router.post('/logout', postLogout);

router.post("/reset", postReset);

router.get("/reset/:token", getNewPassword);

router.post("/new-password", postNewPassword);

module.exports = router;