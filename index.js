const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.route');

const app = express();
const port = 3001;

app.set('view engine', 'pug')
app.set('views', './views')

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//get page index.js  home page
app.get('/', (req, res) => {
    res.render('index', {
        name: 'A'
    });
})

app.use('/users', userRoutes);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))