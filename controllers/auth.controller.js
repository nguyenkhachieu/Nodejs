const db = require('../db');

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

  if (user.password !== password) {
    res.render('auth/login', {
      errors: [
        'password error'
      ]
    })
    return;
  }

  res.redirect('/users')
}