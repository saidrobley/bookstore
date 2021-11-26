const checkAuthentication = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ err: 'user is not authorized' });
  }
};

module.exports = checkAuthentication;
