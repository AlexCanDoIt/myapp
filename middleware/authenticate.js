const passport = require('passport')

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user || !user.token) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized'
      })
      return
    }

    req.user = user
    next()
  })(req, res, next)
}

module.exports = authenticate
