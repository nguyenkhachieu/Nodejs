const express = require('express')
const router = express.Router();
const db = require('../db');

const userDb = db.get('users').value();
//get page users
router.get('', (req, res) => {
    res.render('users/index', {
        users: userDb
    });
});

//search user
router.get('/search', (req, res) => {
    let q = req.query.q;
    const matchedUsers = userDb.filter(user => {
        return user.name.indexOf(q) !== -1;
    })
    res.render('users/index', {
        users: matchedUsers
    })
})


//get create user page
router.get('/create', (req, res) => {
    res.render('users/create')
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = db.get('users').find({id: id}).value();
    res.render('users/view', {
        user: user
    });
})

// create new user
router.post('/create', (req, res) => {
    const data = req.body;
    const newId = userDb.length + 1;
    data.id = newId;
    db.get('users').push(data).write();
    res.redirect('/users/')
})

module.exports = router;