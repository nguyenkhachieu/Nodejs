const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

app.set('view engine', 'pug')
app.set('views', './views')

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

db.defaults({ users: [] })
  .write()

//get page index.js  home page
app.get('/', (req, res) => {
    res.render('index', {
        name: 'A'
    });
})

const userDb = db.get('users').value();

//get page users
app.get('/users', (req, res) => {
    res.render('users/index', {
        users: userDb
    });
});

//search user
app.get('/users/search', (req, res) => {
    let q = req.query.q;
    const matchedUsers = userDb.filter(user => {
        return user.name.indexOf(q) !== -1;
    })
    res.render('users/index', {
        users: matchedUsers
    })
})


//get create user page
app.get('/users/create', (req, res) => {
    res.render('users/create')
})

// create new user
app.post('/users/create', (req, res) => {
    const data = req.body;
    const newId = userDb.length + 1;
    data.id = newId;
    db.get('users').push(data).write();
    res.redirect('/users/')

})



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))