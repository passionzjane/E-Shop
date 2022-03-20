const crypto = require('crypto')

const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
//const {validationResult } = require('express-validatior')
const { validationResult, check } = require("express-validator");


const User = require('../models/user');


const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "af1c76ffa867f5",
    pass: "0b23e8925863e2",
  },
});


exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
    oldInput: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationErrors: []
  });
};

exports.postLogin = (req, res, next) => {
  const {email, password} = req.body

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(422).render("auth/login", {
       path: "/login",
       pageTitle: "Login",
       errorMessage: errors.array()[0].msg,
     });
   }

   User.findOne({email})
     .then((user) => {
       if (!user) {
         req.flash('error', 'Invalid email or password!')
        return res.redirect('/login')
       }
       bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
            res.redirect('/');
          }
          req.flash("error", "Invalid email or password!");
          res.redirect('/login')
       })
        .catch(err => {
          console.log(err);
          res.redirect('/login')
        })
       
     }) 
     .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword} = req.body

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword
      },
      validationErrors: errors.array()
    });
  }
 
      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
          return transporter.sendMail( {
             from: `shop@node-complete.com`,
             to: result.email,
             subject: 'signup succeeded',
             html: '<h1> You are successful</h1>'
             })  
        })
        
    .catch(err => {
      console.log(err)
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};


exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
   res.render("auth/reset", {
     path: "/reset",
     pageTitle: "Reset Password",
     errorMessage: message
   });
}


exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err)
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        req.flash('error', 'No account with that email found!')
        return res.redirect('/reset');
      }
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000
      return user.save();
    })
    .then(result => {
      res.redirect('/');
      transporter.sendMail({
        from: `shop@node-complete.com`,
        to: result.email,
        subject: "Password reset",
        html: `
        <p> You requested for a password reset</p>
        <p> Click this link <a href="http://localhost:3000/reset/${token}"/>link</a> to set a new password.</p>
        `,
      });  
    })
    .catch(err => {
      console.log(err);
    })
  })
}


exports.getNewPassword = (req, res, next) => {
  const token = req.params.token
  User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
  .then(user => {
    console.log(user)
    let message = req.flash("error");
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render("auth/new-password", {
      path: "/new-password",
      pageTitle: "New Password",
      errorMessage: message,
      userId: user._id.toString(),
      passwordToken: token,
    });
  })
  .catch(err => {
    console.log(err)
  })
}

exports.postNewPassword = (req, res, next) => {
  //const { newpassword, userId, passwordToken } = req.body;
  const newpassword = req.body.password
  const userId = req.body.userId
  const passwordToken = req.body.passwordToken
  let resetUser

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now()},
    _id: userId
  }).then(user => {
      resetUser = user
      return bcrypt.hash(newpassword, 12)
  })
  .then(hashedPassword => {
    resetUser.password = hashedPassword
    resetUser.resetToken = undefined
    resetUser.resetTokenExpiration = undefined
    return resetUser.save()
  })
  .then(result => {
    res.redirect('/login')
  })
  .catch(err => {
    console.log(err);
  })
}