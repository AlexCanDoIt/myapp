const current = async (req, res, next) => {
  const currentUser = {
    _id: req.user._id,
    email: req.user.email,
    subscription: 'starter'
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: currentUser
    }
  })
}

module.exports = current
