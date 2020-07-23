const express = require('express')
const router = express.Router();
const controller = require('../controllers/user.controller');

//get page users
router.get('', controller.index);

//search user
router.get('/search', controller.search)


//get create user page
router.get('/create', controller.create)

router.get('/:id', controller.get)

// create new user
router.post('/create', controller.post)

module.exports = router;