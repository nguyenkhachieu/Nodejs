const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index', {
        name: 'A'
    });
})

app.get('/users', (req, res) => {
    res.render('users/index', {
        users: [
            {id: 1, name: 'hieu'},
            {id: 2, name: 'teo em'}
        ]
    });
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))