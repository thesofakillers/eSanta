const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // try/catch block tries to verify token, handling failure to do so
  try {
    // parse the token from the headers
    const receivedToken = req.headers.authorization.split(" ")[1];
    // try to verify token
    const verifiedToken = jwt.verify(receivedToken, process.env.JWT_KEY);
    // set a custom request attribute corresponding to the token
    req.jwt = verifiedToken;
    // tell express to move on to the next function
    next();
  } catch (error) { // error raised when token is invalid
    return res.status(403).send({message: 'Authorization Failed'})
  }
}
