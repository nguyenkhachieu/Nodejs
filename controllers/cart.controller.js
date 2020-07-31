const db = require('../db');

module.exports.addToCart = (req, res, next) => {
  const productId = req.params.productId;
  const sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect('/products');
    return;
  }
  console.log('productId', productId)

  let count = db.get('sessions').find({ id: sessionId }).get('cart.' + productId, 0).write();
  db.get('sessions')
    .find({ id: sessionId })
    .set('cart.' + productId, count + 1)
    .write();

  res.redirect('/products');
  // res.render('cart/:productId', {
  //   cart: matchedUsers
  // })
};