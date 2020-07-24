const express = require('express')
const router = express.Router();
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');
const authMidddleware = require('../middleware/auth.middleware');

//get page users render middleware first
router.get('', authMidddleware.requireAuth, controller.index);

//cookie

router.get('/cookie', function(req, res, next) {
    res.cookie('user-id', 12345)
    res.send('hello cookie');
})

//search user
router.get('/search', controller.search)


//get create user page
router.get('/create', controller.create)

router.get('/:id', controller.get)

// create new user
router.post('/create', validate.post, controller.post)

module.exports = router;