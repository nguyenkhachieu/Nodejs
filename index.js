require('dotenv').config();
console.log(process.env.SESSION_SECRET)
const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user.route');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route');
const cartRoutes = require('./routes/cart.route');

const authMiddleware = require('./middleware/auth.middleware');
const sessionMiddleware = require('./middleware/session.middeware');

const app = express();
const port = 3001;

app.set('view engine', 'pug')
app.set('views', './views')

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static('public'))

//get page index.js  home page
app.get('/', (req, res) => {
    res.render('index', {
        name: 'Node js Express'
    });
})

app.use('/users', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))