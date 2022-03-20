const express = require('express');
const { check, body} = require('express-validator');

const {getLogin, postLogin, postLogout,
     getSignup, postSignup, getReset,
     postReset, getNewPassword, postNewPassword} = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', getLogin);

router.get('/signup', getSignup);

router.get("/reset", getReset);

router.post('/login', postLogin);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email or password")
      .custom((value, { req }) => {
     //    if (value === "tony@mail.com") {
     //      throw new Error("This email address is forbidden.");
     //    }
     //    return true;
     return User.findOne({email: value}) 
    .then(userDoc => {
      if (userDoc) {
        return Promise.reject(
             'E-Mail exists already, please pick a different one.'
          )
     }
      })
     }),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmpassword").custom((value, {req}) => {
         if (value !== req.body.password) {
              throw new Error('Passwords have to match!');
         }
         return true;
    })
  ],
  postSignup
);

router.post('/logout', postLogout);

router.post("/reset", postReset);

router.get("/reset/:token", getNewPassword);

router.post("/new-password", postNewPassword);

module.exports = router;