const db = require('../db');

let pagination = 10;

module.exports.getProducts = (req, res) => {
    const page = req.query.page || 1;
    const start = (page - 1) * pagination;
    const end = page * pagination;
    const data = db.get('products').value().slice(start, end);
    res.render('products', {
        products: data,
    });
}