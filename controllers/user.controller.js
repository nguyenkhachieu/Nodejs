const db = require('../db');
const userDb = db.get('users').value();

module.exports = {
  index: (req, res) => {
    res.render('users/index', {
        users: userDb
    });
  },

  search: (req, res) => {
    let q = req.query.q;
    const matchedUsers = userDb.filter(user => {
        return user.name.indexOf(q) !== -1;
    })
    res.render('users/index', {
        users: matchedUsers
    })
  },

  create: (req, res) => {
      console.log(req.cookies)
    res.render('users/create')
  },

  get: (req, res) => {
    const id = parseInt(req.params.id);
    const user = db.get('users').find({id: id}).value();
    res.render('users/view', {
        user: user
    });
  },

  post: (req, res) => {
    const data = req.body;
    const newId = userDb.length + 1;
    data.id = newId;
    console.log('req.file.path', req.file)
    data.avatar = `/uploads/${req.file.filename}`;

    db.get('users').push(data).write();
    res.redirect('/users/')
  }

}