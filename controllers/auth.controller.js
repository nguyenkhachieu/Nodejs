const db = require('../db');
const md5 = require('md5');

module.exports.login = (req, res) => {
  res.render('auth/login');
},

module.exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = db.get('users').find({ email: email }).value();

  if (!user) {
    res.render('auth/login', {
      errors: [
        'email error'
      ]
    })
    return;
  }

  const hashedPassword = md5(password);

  if (user.password !== hashedPassword) {
    res.render('auth/login', {
      errors: [
        'password error'
      ]
    })
    return;
  }
  res.cookie('userId', user.id, {
    signed: true
  });
  res.redirect('/users')
}