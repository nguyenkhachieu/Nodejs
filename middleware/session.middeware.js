const db = require('../db');
const shortid = require('shortid');

module.exports = async (req, res, next) => {
  console.log(1111, req.signedCookies.sessionId)
  if (!req.signedCookies.sessionId) {
    res.cookie('sessionId', shortid.generate(), {
      signed: true
    });
  }

  // db.get('sessions').push({
  //   id: req.signedCookies.sessionId
  // }).write();

  next();
}