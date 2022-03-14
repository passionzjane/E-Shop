const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req
  // .get('cookie')
  // .split('=')[1];
  console.log(req.session.isLoggedIn)
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  //req.session.isLoggedIn = true
  //res.redirect('/')
   User.findById("62284863dd44702ef856efae")
     .then((user) => {
       req.session.isLoggedIn = true;
       req.session.save(err => {
        console.log(err)
        res.redirect("/");
       })
     })
     .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};