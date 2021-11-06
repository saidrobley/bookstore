const checkAuthentication = async (req, res, next) => {
  console.log('inside ...');
  if (req.isAuthenticated()) {
    console.log('req is auth');
    next();
  } else {
    res.status(401).json({ err: 'user is not authorized' });
    // res.send('user is not authorized');
  }
};

module.exports = checkAuthentication;
