module.exports.post = function(req, res, next) {
    const errors = [];
    const data = req.body;
    if (!data.name) {
        errors.push('name is required.')
    }
    if (errors.length) {
        res.render('users/create', {
            errors: errors
        })
        return;
    }
    next();
}