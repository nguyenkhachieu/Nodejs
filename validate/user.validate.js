module.exports.post = function(req, res, next) {
    const errors = [];
    const data = req.body;
    console.log('data', data)
    if (!data.name) {
        errors.push('name is required.')
    }
    if (errors.length) {
        res.render('users/create', {
            errors: errors
        })
        return;
    }
    console.log('errors', errors)
    next();
}