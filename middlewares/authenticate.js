//const User = require(../models/user.js)

const authenticate = (req, res, next) => {
    //this needs to be written better.
    if (!req.session || !req.session.User) {
        const err = new Error('YEEEEEEEEEEET')
        err.status(401)
        next(err)
    }
    next()
}

module.exports = authenticate